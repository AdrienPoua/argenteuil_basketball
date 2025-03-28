import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import { Engagement } from '@/app/api/ffbb/poules/route';
import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import saveMatchsToDatabase from '@/actions/process/saveMatchsToDatabase';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { processMatchsFromFFBB } from '@/actions/hydrate/matchs';
import getToken from '@/actions/fetchs/ffbb/getToken';

const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, CRON_SECRET } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD || !CRON_SECRET) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, CRON_SECRET are not set');
}

const { TOKEN: tokenEndpoint, POULES: poulesEndpoint, MATCHS: matchsEndpoint } = API_ENDPOINTS_FFBB;

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET(req: NextRequest) {
  try {
    // Verify if the cron job is authorized
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }

    // Get the token
    const token = await getToken();

    // Get the poules ids
    const poulesIds = await getPoules(token);

    // Get the matchs
    const matchs = await getMatchs(token, poulesIds);

    // Save the matchs to the database
    await saveMatchsToDatabase(matchs);
    return NextResponse.json({ message: 'Clubs et matchs mis à jour avec succès', status: 200 });
  } catch (error) {
    return errorHandler('Erreur lors de la mise à jour automatique des données FFBB: ' + error, 500);
  }
}

const getPoules = async (token: string) => {
  try {
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
  } catch (error) {
    console.error('Erreur lors de la récupération des poules:', error);
    throw new Error('Erreur lors de la récupération des poules');
  }
};

const getMatchs = async (token: string, poulesIds: number[]) => {
  try {
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
        const processedMatchs = await processMatchsFromFFBB(data);
        return processedMatchs;
      }),
    );

    const flatMatchs = matchs.flat();
    return flatMatchs;
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs:', error);
    throw new Error('Erreur lors de la récupération des matchs');
  }
};
