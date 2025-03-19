import getToken from './getToken';
import { getSessionCookie } from '@/actions/process/getSessionCookie';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

const getPoules = async () => {
  const token = await getToken();
  const nextAuthCookie = getSessionCookie();

  try {
    const res = await fetch(`${baseUrl}/api/ffbb/poules`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `${nextAuthCookie.name}=${nextAuthCookie.value}`,
      },
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
