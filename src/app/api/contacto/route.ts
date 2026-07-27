import { NextResponse } from "next/server"; // Importa la clase para estructurar respuestas HTTP de Next.js
import nodemailer from "nodemailer"; // Importa la librería para enviar correos electrónicos vía SMTP

/**
 * ==============================================================================
 * 1. SISTEMA DE LIMITACIÓN DE PETICIONES (RATE LIMITER EN MEMORIA)
 * ==============================================================================
 * Almacena en memoria un historial de IPs para evitar ataques de spam o saturación.
 * ipCache: Map con clave = IP del cliente (string), valor = contador y timestamp.
 */
const ipCache = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 3; // Máximo de 3 mensajes permitidos por ventana de tiempo
const WINDOW = 60 * 1000; // Ventana de tiempo: 60 segundos (1 minuto en milisegundos)

/**
 * Función que comprueba si la IP especificada ha superado el límite de peticiones.
 * @param ip Dirección IP del cliente que realiza la petición.
 * @returns boolean -> true si está bloqueado por rate limit, false si puede continuar.
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now(); // Obtiene el timestamp actual en milisegundos
  const record = ipCache.get(ip); // Busca si esta IP ya tiene registros previos

  // Caso 1: Primera vez que esta IP realiza una petición en la sesión
  if (!record) {
    ipCache.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // Caso 2: Ha pasado más de 1 minuto desde el último reinicio -> Reiniciamos la cuenta
  if (now - record.lastReset > WINDOW) {
    record.count = 1;
    record.lastReset = now;
    return false;
  }

  // Caso 3: Dentro de la misma ventana de 1 minuto -> Incrementamos el contador
  record.count++;
  // Si superó el límite (LIMIT = 3), retorna true (bloqueado)
  return record.count > LIMIT;
}

/**
 * ==============================================================================
 * 2. MANEJADOR PRINCIPAL HTTP POST (/api/contacto)
 * ==============================================================================
 * Función asíncrona exportada con nombre POST para manejar peticiones de tipo POST en Next.js App Router.
 */
export async function POST(request: Request) {
  try {
    // PASS 1: Obtención de la IP del cliente (considerando proxies/load balancers mediante x-forwarded-for)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";

    // PASS 2: Verificación de Rate Limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados mensajes enviados. Por favor, espera un minuto antes de enviar otro." },
        { status: 429 } // HTTP 429: Too Many Requests
      );
    }

    // PASS 3: Lectura y desestructuración del cuerpo de la petición (JSON)
    const body = await request.json();
    const { nombre, email, mensaje, honeypot } = body;

    // PASS 4: Trampa Anti-Spam (Honeypot)
    // El campo 'honeypot' es invisible para humanos en el formulario frontend. Si viene relleno, es un bot.
    if (honeypot) {
      // Respondemos OK engañando al bot, pero no procesamos ni enviamos el correo.
      return NextResponse.json({ success: true, message: "OK" });
    }

    // PASS 5: Validación de campos obligatorios
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 } // HTTP 400: Bad Request
      );
    }

    // PASS 6: Validación de formato de email mediante Expresión Regular (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El correo electrónico introducido no es válido." },
        { status: 400 } // HTTP 400: Bad Request
      );
    }

    // PASS 7: Sanitización de datos para prevenir inyecciones de código HTML/XSS
    const sanitize = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const sanitizedNombre = sanitize(String(nombre).trim());
    const sanitizedEmail = sanitize(String(email).trim());
    const sanitizedMensaje = sanitize(String(mensaje).trim());

    // PASS 8: Carga de variables de entorno para destinatario y servidor SMTP
    const destEmail = process.env.CONTACT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL || "reservas.autonet@gmail.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // PASS 9: Construcción de la plantilla del correo electrónico en formato HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background-color: #ffffff;">
        <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">📩 Nuevo Mensaje de Contacto - Autonet</h2>
        
        <div style="margin-bottom: 16px; padding: 12px; background-color: #f8fafc; border-radius: 8px;">
          <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Cliente:</strong> ${sanitizedNombre}</p>
          <p style="margin: 4px 0; color: #334155; font-size: 14px;"><strong>Email de respuesta:</strong> <a href="mailto:${sanitizedEmail}" style="color: #2563eb;">${sanitizedEmail}</a></p>
        </div>

        <p style="color: #475569; font-size: 14px; font-weight: bold; margin-bottom: 8px;">Mensaje enviado por el cliente:</p>
        <div style="background-color: #f1f5f9; padding: 16px; border-left: 4px solid #2563eb; border-radius: 4px; color: #1e293b; font-size: 14px; line-height: 1.6; whitespace: pre-wrap;">
          ${sanitizedMensaje}
        </div>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">Este correo ha sido generado automáticamente por el formulario de contacto de autonet.es</p>
      </div>
    `;

    // PASS 10: Envío del correo vía SMTP con Nodemailer si las credenciales están configuradas
    if (smtpHost && smtpUser && smtpPass) {
      // Creación del transporte de Nodemailer con la configuración SMTP
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // SSL si es puerto 465, TLS/STARTTLS para 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Envío real del email al destinatario del negocio
      await transporter.sendMail({
        from: `"Autonet Web" <${smtpUser}>`,
        replyTo: sanitizedEmail, // Permite que al dar a "Responder" en el correo se escriba directamente al cliente
        to: destEmail,
        subject: `📩 Nuevo mensaje de ${sanitizedNombre} - Autonet`,
        html: emailHtml,
      });

      return NextResponse.json({
        success: true,
        message: "Mensaje enviado correctamente al correo del negocio.",
      });
    }

    // PASS 11: Modo desarrollo o sin SMTP -> Registro en consola (Log Fallback)
    console.log(`[CONTACTO RECIBIDO] Para: ${destEmail} | De: ${sanitizedNombre} (${sanitizedEmail}) | Mensaje: ${sanitizedMensaje}`);

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido correctamente.",
    });

  } catch (error) {
    // Captura de errores inesperados en el proceso (excepciones)
    console.error("Error en /api/contacto:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el mensaje." },
      { status: 500 } // HTTP 500: Internal Server Error
    );
  }
}

