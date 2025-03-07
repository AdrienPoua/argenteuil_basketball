
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { errorHandler } from '@/lib/utils/handleApiError';
import getToken from '@/actions/fetchs/ffbb/getToken';
import { validateUser } from '@/lib/api/validateUser';
// Check if the environment variables are set
const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set');
}

export async function GET() {
  await validateUser();

  try {
    // Obtenir le token (mis en cache)
    const token = await getToken();

    if (!token) {
      throw new Error("Token invalide reçu de l'API FFBB");
    }

    // Configurer le cookie
    cookies().set('ffbb_token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 3300,
    });

    return NextResponse.json(token, { status: 200 });
  } catch (err) {
    return errorHandler(err);
  }
}
