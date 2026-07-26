import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiter cache for contact messages
const ipCache = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 3; // max 3 messages per minute
const WINDOW = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record) {
    ipCache.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - record.lastReset > WINDOW) {
    record.count = 1;
    record.lastReset = now;
    return false;
  }

  record.count++;
  return record.count > LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados mensajes enviados. Por favor, espera un minuto antes de enviar otro." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { nombre, email, mensaje, honeypot } = body;

    // Spam honeypot detection
    if (honeypot) {
      return NextResponse.json({ success: true, message: "OK" });
    }

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El correo electrónico introducido no es válido." },
        { status: 400 }
      );
    }

    const sanitize = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const sanitizedNombre = sanitize(String(nombre).trim());
    const sanitizedEmail = sanitize(String(email).trim());
    const sanitizedMensaje = sanitize(String(mensaje).trim());

    const destEmail = process.env.CONTACT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL || "reservas.autonet@gmail.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

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

    // If SMTP credentials exist, send real email via Nodemailer
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Autonet Web" <${smtpUser}>`,
        replyTo: sanitizedEmail,
        to: destEmail,
        subject: `📩 Nuevo mensaje de ${sanitizedNombre} - Autonet`,
        html: emailHtml,
      });

      return NextResponse.json({
        success: true,
        message: "Mensaje enviado correctamente al correo del negocio.",
      });
    }

    // Default: Log details and return success response
    console.log(`[CONTACTO RECIBIDO] Para: ${destEmail} | De: ${sanitizedNombre} (${sanitizedEmail}) | Mensaje: ${sanitizedMensaje}`);

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido correctamente.",
    });

  } catch (error) {
    console.error("Error en /api/contacto:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el mensaje." },
      { status: 500 }
    );
  }
}
