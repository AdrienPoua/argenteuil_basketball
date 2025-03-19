import { Organisme } from '@/app/api/ffbb/organismes/[id]/route';
import getToken from './getToken';
import getCompetitions from './getCompetitions';
import { getSessionCookie } from '@/actions/process/getSessionCookie';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

const getOrganismes = async () => {
  const token = await getToken();
  const nextAuthCookie = getSessionCookie();

  const ids = await getCompetitions().then((competitions) => competitions.map((competition) => competition.id));
  const organismes = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetch(`${baseUrl}/api/ffbb/organismes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `${nextAuthCookie.name}=${nextAuthCookie.value}`,
          },
        });
        if (!res.ok)
          throw new Error('Failed to fetch organismes', { cause: { statusText: res.statusText, status: res.status } });
        const data = (await res.json()) as Organisme[];
        return data;
      } catch (error) {
        console.error(`Error fetching organismes: ${id}`, error);
        throw error;
      }
    }),
  );
  const uniqueOrganismes = Array.from(new Map(organismes?.flat().map((org) => [org.id, org])).values());
  return uniqueOrganismes;
};

export default getOrganismes;
