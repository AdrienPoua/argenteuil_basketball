import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { errorHandler } from '@/lib/utils/handleApiError';
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
  image: z.any(), // ✅ Accepte tout type de fichier, on le convertira en Buffer après
  name: z.string(),
});

export async function POST(req: Request): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
  } catch (error: any) {
    return errorHandler(error);
  }
}
