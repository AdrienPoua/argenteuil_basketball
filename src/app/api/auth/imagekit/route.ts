import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';

const { publicKey, privateKey, urlEndpoint } = process.env;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error('ImageKit environment variables are not set');
}

const imagekit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey,
  urlEndpoint: urlEndpoint,
});

const fileSchema = z.object({
  image: z.any(), // ✅ Accepte tout type de fichier, on le convertira en Buffer après
  name: z.string(),
});

export async function POST(req: Request): Promise<Response> {
  await validateUser();

  try {
    // Récupérer le fichier depuis FormData
    const formData = await req.formData();
    const file = formData.get('file');
    const fileName = formData.get('fileName');

    // Validation des données
    const { image, name } = fileSchema.parse({
      image: file,
      name: fileName,
    });
    // Convertir le fichier en buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Upload avec ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: name,
    });

    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}
