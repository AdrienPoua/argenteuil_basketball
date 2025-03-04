import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import { Organisme } from '@/app/api/ffbb/organismes/[id]/route';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_BASE_URL is not set');
}


export async function fetchDataFromFbi() {
  try {
    const token = await fetchToken();
    const poules = await fetchPoules(token);
    const competitions = await fetchCompetitions(token);
    const competitionsIds = competitions?.map((competition) => competition.id);
    if (!competitionsIds || !poules) throw new Error('Failed to fetch competitions ids or poules');
    const matchs = await fetchMatchs(poules, token);
    const organismes = await fetchOrganismes(competitionsIds, token);
    if (!matchs) throw new Error('Failed to fetch matchs');
    if (!organismes) throw new Error('Failed to fetch organismes');
    if (!competitions) throw new Error('Failed to fetch competitions');
    return {
      competitions,
      matchs,
      organismes,
    };
  } catch (error) {
    console.error('Error fetching data from FBI:', error);
    throw error;
  }
}

const fetchToken = async () => {
  const res = await fetch(`${baseUrl}/api/ffbb/token`);
  if (!res.ok) throw new Error('Failed to fetch token', { cause: { statusText: res.statusText, status: res.status } });
  const token = (await res.json()) as string;
  return token;
};


export const fetchPoules = async (token: string) => {
  const res = await fetch(`${baseUrl}/api/ffbb/poules`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch poules', { cause: { statusText: res.statusText, status: res.status } });
  const data = (await res.json()) as number[] | undefined;
  return data;
};

const fetchCompetitions = async (token: string) => {
  const res = await fetch(`${baseUrl}/api/ffbb/competitions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok)
    throw new Error('Failed to fetch competitions', { cause: { statusText: res.statusText, status: res.status } });
  const data = (await res.json()) as { id: number; label: string }[] | undefined;
  return data;
};

const fetchOrganismes = async (ids: number[], token: string) => {
  const organismes = await Promise.all(
    ids.map(async (id) => {
      try {
        const res = await fetch(`${baseUrl}/api/ffbb/organismes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

const fetchMatchs = async (ids: number[], token: string) => {
  try {
    const matchs = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`${baseUrl}/api/ffbb/matchs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok)
          throw new Error('Failed to fetch matchs', { cause: { statusText: res.statusText, status: res.status } });
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
