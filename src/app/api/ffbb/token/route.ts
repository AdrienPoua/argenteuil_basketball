import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { errorHandler } from '@/lib/utils/handleApiError';

// Check if the environment variables are set
const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set');
}

const endpoint = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/authentication.ws';

// Fonction pour obtenir le token
async function getToken() {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    },
    body: JSON.stringify({
      userName: FFBB_SERVER_USERNAME,
      password: FFBB_SERVER_PASSWORD,
    }),
    // Très important: cache avec revalidation en arrière-plan
    next: { 
      revalidate: 3300, // Revalider après 55 minutes (avant expiration)
      tags: ['ffbb-token'] // Tag pour invalidation manuelle si nécessaire
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération du token: ${res.status}`);
  }

  return await res.text();
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Obtenir le token (mis en cache)
    const token = await getToken();
    
    if (!token) {
      throw new Error('Token invalide reçu de l\'API FFBB');
    }
    
    // Configurer le cookie
    cookies().set('ffbb_token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 3300,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return errorHandler(err);
  }
}
