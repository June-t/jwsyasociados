import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nombre = (body?.nombre ?? "").toString().trim();
    const correo = (body?.correo ?? "").toString().trim();
    const servicio = (body?.servicio ?? "").toString().trim();
    const mensaje = (body?.mensaje ?? "").toString().trim();

    if (!nombre || !correo || !servicio || !mensaje) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return NextResponse.json(
        { ok: false, error: "El correo no es válido." },
        { status: 400 }
      );
    }

    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO;

    if (!process.env.RESEND_API_KEY || !from || !to) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Falta configuración del servidor de correo. Define RESEND_API_KEY, RESEND_FROM y RESEND_TO en .env.local",
        },
        { status: 500 }
      );
    }

    const subject = `Nuevo contacto: ${nombre} — ${servicio}`;

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #222">
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(correo)}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(servicio)}</p>
        <p><strong>Mensaje:</strong><br/>${escapeHtml(mensaje).replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="font-size:12px;color:#666">Enviado desde el sitio web</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: correo,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || "No se pudo enviar el correo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Error inesperado." },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
