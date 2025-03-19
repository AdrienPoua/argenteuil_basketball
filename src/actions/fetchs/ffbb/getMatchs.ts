import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import getToken from './getToken';
import getPoules from './getPoules';
import { getSessionCookie } from '@/actions/process/getSessionCookie';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

const putMatchs = async () => {
  try {
    const nextAuthCookie = getSessionCookie();
    const poules = await getPoules();
    const token = await getToken();

    const matchs = await Promise.all(
      poules.map(async (poule) => {
        const res = await fetch(`${baseUrl}/api/ffbb/matchs/${poule}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `${nextAuthCookie.name}=${nextAuthCookie.value}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch matchs', { cause: { statusText: res.statusText, status: res.status } });
        }
        const data = (await res.json()) as Match[];
        return data;
      }),
    );
    return matchs.flat();
  } catch (error) {
    console.error('Error fetching matchs:', error);
    throw error;
  }
};

export default putMatchs;
