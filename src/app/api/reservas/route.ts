import { NextResponse } from "next/server";
import { google } from "googleapis";
import { services } from "@/data/services";

// In-memory rate limiter cache
const ipCache = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 5; // max 5 requests
const WINDOW = 60 * 1000; // per 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record) {
    ipCache.set(ip, { count: 1, lastReset: now });
    return false; // Not rate limited
  }

  if (now - record.lastReset > WINDOW) {
    record.count = 1;
    record.lastReset = now;
    return false; // Reset window, not rate limited
  }

  record.count++;
  if (record.count > LIMIT) {
    return true; // Rate limited
  }

  return false;
}

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting check
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Por favor, inténtalo de nuevo en un minuto." },
        { status: 429 }
      );
    }

    // 2. CSRF / Origin check
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json(
        { error: "Acceso no autorizado (Origen no válido)." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { service, dateString, time, clientInfo } = body;

    // Validate input
    if (!service || !dateString || !time || !clientInfo) {
      return NextResponse.json(
        { error: "Faltan datos requeridos para la reserva." },
        { status: 400 }
      );
    }

    // Server-side validation of the service to prevent price/duration manipulation from client
    const serviceId = typeof service === "object" ? service?.id : service;
    const matchedService = services.find((s) => s.id === serviceId);

    if (!matchedService) {
      return NextResponse.json(
        { error: "El servicio seleccionado no es válido." },
        { status: 400 }
      );
    }

    const { name: serviceName, duration, price } = matchedService;
    const { name: clientName, email: clientEmail, phone: clientPhone, notes: clientNotes } = clientInfo;

    // Strict Input Validation
    if (typeof dateString !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return NextResponse.json(
        { error: "El formato de fecha no es válido (debe ser AAAA-MM-DD)." },
        { status: 400 }
      );
    }

    if (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json(
        { error: "El formato de hora no es válido (debe ser HH:MM)." },
        { status: 400 }
      );
    }

    if (typeof clientName !== "string" || clientName.trim().length < 2) {
      return NextResponse.json(
        { error: "El nombre del cliente debe tener al menos 2 caracteres." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof clientEmail !== "string" || !emailRegex.test(clientEmail)) {
      return NextResponse.json(
        { error: "El correo electrónico proporcionado no es válido." },
        { status: 400 }
      );
    }

    const cleanPhone = String(clientPhone || "").replace(/\s/g, "");
    if (!/^\+?[\d]{9,15}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "El número de teléfono proporcionado no es válido." },
        { status: 400 }
      );
    }

    // Sanitize string inputs to prevent HTML/script injection in calendar events
    const sanitize = (str: string) => {
      if (typeof str !== "string") return "";
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const sanitizedClientName = sanitize(clientName.trim());
    const sanitizedClientNotes = sanitize((clientNotes || "").trim());
    const sanitizedClientPhone = sanitize(clientPhone.trim());

    // Parse duration (e.g., "45 min", "60 min")
    const durationMin = parseInt(duration.replace(/\D/g, ""), 10) || 60;

    // Timezone-independent date calculation
    const [year, month, day] = dateString.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    // Create start Date using UTC constructor to prevent timezone offsets during parsing
    const start = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const end = new Date(start.getTime() + durationMin * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, "0");
    const formatUTC = (d: Date) => {
      return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    };

    const startISO = formatUTC(start);
    const endISO = formatUTC(end);

    const clientEmailEnv = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKeyEnv = process.env.GOOGLE_PRIVATE_KEY;
    const calendarIdEnv = process.env.GOOGLE_CALENDAR_ID;

    // Check if configuration is present. If not, log a warning and return simulated success
    if (!clientEmailEnv || !privateKeyEnv || !calendarIdEnv) {
      console.warn(
        "Google Calendar API credentials are not fully configured in environment variables. Simulating successful registration."
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Reserva recibida correctamente (Modo simulación - Sin credenciales de Google)."
      });
    }

    // Authenticate with Google API using JWT options object
    const auth = new google.auth.JWT({
      email: clientEmailEnv,
      key: privateKeyEnv.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/calendar"]
    });

    const calendar = google.calendar({ version: "v3", auth });

    const eventDescription = `
🚗 **Detalles de la Reserva de Autonet** 🚗

**Cliente:**
- Nombre: ${sanitizedClientName}
- Teléfono: ${sanitizedClientPhone}
- Email: ${clientEmail}

**Servicio:**
- Tipo: ${serviceName}
- Precio: ${price}€
- Duración: ${duration}

**Notas adicionales:**
${sanitizedClientNotes || "Ninguna"}
    `.trim();

    const response = await calendar.events.insert({
      calendarId: calendarIdEnv,
      requestBody: {
        summary: `🚗 Reserva Autonet: ${serviceName} - ${sanitizedClientName}`,
        description: eventDescription,
        start: {
          dateTime: startISO,
          timeZone: "Europe/Madrid"
        },
        end: {
          dateTime: endISO,
          timeZone: "Europe/Madrid"
        }
      }
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      message: "Reserva creada y sincronizada con Google Calendar."
    });

  } catch (error: any) {
    console.error("Error al procesar la reserva con Google Calendar:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar la reserva." },
      { status: 500 }
    );
  }
}
