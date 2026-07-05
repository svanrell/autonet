import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { service, dateString, time, clientInfo } = body;

    // Validate input
    if (!service || !dateString || !time || !clientInfo) {
      return NextResponse.json(
        { error: "Faltan datos requeridos para la reserva." },
        { status: 400 }
      );
    }

    const { name: serviceName, duration, price } = service;
    const { name: clientName, email: clientEmail, phone: clientPhone, notes: clientNotes } = clientInfo;

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
- Nombre: ${clientName}
- Teléfono: ${clientPhone}
- Email: ${clientEmail}

**Servicio:**
- Tipo: ${serviceName}
- Precio: ${price}€
- Duración: ${duration}

**Notas adicionales:**
${clientNotes || "Ninguna"}
    `.trim();

    const response = await calendar.events.insert({
      calendarId: calendarIdEnv,
      requestBody: {
        summary: `🚗 Reserva Autonet: ${serviceName} - ${clientName}`,
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
      { error: "Error interno del servidor al procesar la reserva.", details: error.message },
      { status: 500 }
    );
  }
}
