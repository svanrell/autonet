import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No se ha proporcionado imagen válida." }, { status: 400 });
    }

    // Strip header prefix if present (e.g. data:image/png;base64,)
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");

    const formData = new FormData();
    formData.append("image", cleanBase64);

    const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=6d000714470d5b7763c9494d4569b366", {
      method: "POST",
      body: formData,
    });

    const data = await imgbbRes.json();

    if (data.success && data.data && data.data.url) {
      return NextResponse.json({ url: data.data.url });
    }

    console.error("ImgBB upload failed:", data);
    return NextResponse.json({ error: "No se pudo generar la URL de la imagen." }, { status: 500 });
  } catch (err) {
    console.error("Error en /api/upload:", err);
    return NextResponse.json({ error: "Error interno al subir la imagen." }, { status: 500 });
  }
}
