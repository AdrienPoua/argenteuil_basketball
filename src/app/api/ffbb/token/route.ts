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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
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
      next: { revalidate: 3600 },
    });
    const token = await res.text();
    cookies().set('ffbb_token', token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 3600,
    });

    const response = NextResponse.json({ token }, { status: 200 });
    return response;
  } catch (err) {
    return errorHandler(err);
  }
}
