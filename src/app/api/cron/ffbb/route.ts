import { NextResponse } from 'next/server';
import { Engagement } from '@/app/api/ffbb/poules/route';
import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import saveMatchsToDatabase from '@/actions/process/saveMatchsToDatabase';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { headers } from 'next/headers';

const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD are not set');
}

const { TOKEN: tokenEndpoint, POULES: poulesEndpoint, MATCHS: matchsEndpoint } = API_ENDPOINTS_FFBB;

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET() {
  try {
    verifyCronJob();
    const token = await getToken();
    const poulesIds = await getPoules(token);
    const matchs = await getMatchs(token, poulesIds);
    await saveMatchsToDatabase(matchs);

    return NextResponse.json({ success: true, message: 'Clubs et matchs mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour automatique des données FFBB:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la mise à jour des données' }, { status: 500 });
  }
}

const verifyCronJob = () => {
  const headersList = headers();
  const authorization = headersList.get('authorization');
  const CRON_SECRET = process.env.CRON_SECRET;
  if (!authorization || authorization !== `Bearer ${CRON_SECRET}`) {
    console.error("Tentative d'accès non autorisée à la route cron");
    throw new Error('Non autorisé, le cron job est utilisable uniquement sur vercel par le serveur');
  }
};

const getToken = async () => {
  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    },
    body: JSON.stringify({
      userName: FFBB_SERVER_USERNAME,
      password: FFBB_SERVER_PASSWORD,
    }),
  });

  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération du token: ${res.status}`);
  }

  const token = await res.text();
  return token;
};

const getPoules = async (token: string) => {
  const response = await fetch(poulesEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error from FFBB: ${response.statusText}`);
  }

  const data: Engagement[] = await response.json();
  const poulesIds = data.map((data) => data.idPoule);
  return poulesIds;
};

const getMatchs = async (token: string, poulesIds: number[]) => {
  const matchs = await Promise.all(
    poulesIds.map(async (poule) => {
      const res = await fetch(`${matchsEndpoint}${poule}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch matchs', { cause: { statusText: res.statusText, status: res.status } });
      }
      const data = (await res.json()) as Match[];
      return data;
    }),
  );

  const flatMatchs = matchs.flat();
  return flatMatchs;
};
