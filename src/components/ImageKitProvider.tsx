'use client';

import { ImageKitProvider } from 'imagekitio-next';
import { z } from 'zod';

const envSchema = z.object({
  urlEndpoint: z.string().url(),
  publicKey: z.string(),
});

const { urlEndpoint, publicKey } = envSchema.parse({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
});

export default function ImageKitProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const authenticator = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/imagekit');

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      {children}
    </ImageKitProvider>
  );
}
