import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import { Organisme } from '@/app/api/ffbb/organismes/[id]/route';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if(!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
    return NextResponse.json({ poules, competitions, matchs, organismes }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

const fetchToken = async () => {
  const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
  if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
    throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set');
  }

  const endpoint = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/authentication.ws';
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
    next: {
      revalidate: 3300,
      tags: ['ffbb-token'],
    },
  });

  if (!res.ok) {
    throw new Error(`Error retrieving token: ${res.status}`);
  }

  return await res.text();
};
  
const fetchPoules = async (token: string) => {
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
  