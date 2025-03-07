import getToken from './getToken';
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

const getPoules = async () => {
  const token = await getToken();
  // Récupère le cookie de session
  const nextAuthCookie = cookies().get('next-auth.session-token');
  if (!nextAuthCookie) throw new Error('No next-auth.session-token cookie found');
  try {
    const res = await fetch(`${baseUrl}/api/ffbb/poules`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `${nextAuthCookie.name}=${nextAuthCookie.value}`,
      }
    });
    if (!res.ok)
      throw new Error('Failed to fetch poules', { cause: { statusText: res.statusText, status: res.status } });
    return (await res.json()) as number[];
  } catch (error) {
    console.error('Error fetching poules:', error);
    throw error;
  }
};

export default getPoules; 