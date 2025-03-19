import getToken from './getToken';
import { getSessionCookie } from '@/actions/process/getSessionCookie';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

const getCompetitions = async () => {
  try {
    // Récupère le token de FFBB
    const token = await getToken();
    const nextAuthCookie = getSessionCookie();

    // Récupère les compétitions
    const res = await fetch(`${baseUrl}/api/ffbb/competitions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `${nextAuthCookie.name}=${nextAuthCookie.value}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch competitions', { cause: { status: res.status } });
    }
    const data = (await res.json()) as { id: number; label: string }[];
    return data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
};

export default getCompetitions;
