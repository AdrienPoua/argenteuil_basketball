import ImageKit from "imagekit";
import { NextResponse } from "next/server";
import { z } from "zod";

const envSchema = z.object({
  publicKey: z.string(),
  privateKey: z.string(),
  urlEndpoint: z.string().url(),
});

const env = envSchema.parse({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

const imagekit = new ImageKit({
  publicKey: env.publicKey,
  privateKey: env.privateKey,
  urlEndpoint: env.urlEndpoint,
});

const fileSchema = z.object({
  image: z.instanceof(File),
  name: z.string(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    // Récupérer le fichier depuis FormData
    const formData = await req.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName");

    // Validation des données
    const { image, name } = fileSchema.parse({
      image: file,
      name: fileName,
    });
    console.log("🚀 ~ POST ~ name:", name)
    console.log("🚀 ~ POST ~ image:", image)

    // Convertir le fichier en buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("🚀 ~ POST ~ arrayBuffer:", arrayBuffer)
    console.log("🚀 ~ POST ~ buffer:", buffer)

    // Upload avec ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: name,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Erreur lors de l'upload :", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
