import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import getToken from '@/actions/fetchs/ffbb/getToken';
import { Competition } from '@/app/api/ffbb/competitions/route';
import { processCompetitions } from '@/actions/process/ProcessCompetitions';
import { CompetitionWithClassements, processClubs } from '@/app/api/ffbb/organismes/[id]/route';
import saveClubsToDatabase from '@/actions/process/saveClubsToDatabase';
import { processOrganismes } from '@/actions/fetchs/ffbb/getOrganismes';

const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, NEXT_PUBLIC_BASE_URL, CRON_SECRET } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD || !CRON_SECRET || !NEXT_PUBLIC_BASE_URL) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, CRON_SECRET, NEXT_PUBLIC_BASE_URL are not set');
}

const { COMPETITIONS: competitionsEndpoint, ORGANISMES: organismesEndpoint } = API_ENDPOINTS_FFBB;

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET(req: NextRequest) {
  try {
    // Verify if the cron job is authorized
    if (req.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }

    // Get Token
    const token = await getToken();

    // Get Competitions Ids
    const competitionsIds = await getCompetitions(token);

    // Use Ids to fetch Organismes
    const organismes = await getOrganismes(token, competitionsIds);
    const parsedOrganismes = processOrganismes(organismes);

    // Save Organismes to Database
    await saveClubsToDatabase(parsedOrganismes);

    return NextResponse.json({ message: 'Organismes sauvegardés avec succès', status: 200 });
  } catch (error) {
    console.error('Erreur dans la route clubs:', error);
    return errorHandler(error);
  }
}

const getCompetitions = async (token: string) => {
  const response = await fetch(competitionsEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    errorHandler(response.statusText, response.status);
  }
  const data: Competition[] = await response.json();
  return processCompetitions(data).map((competition) => competition.id);
};

const getOrganismes = async (token: string, competitionsIds: number[]) => {
  return await Promise.all(
    competitionsIds.map(async (id) => {
      try {
        const response = await fetch(organismesEndpoint + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) errorHandler(response.statusText, response.status);

        const data = (await response.json()) as CompetitionWithClassements[];
        const clubs = processClubs(data);
        return clubs;
      } catch (error) {
        console.error(`Error fetching organismes: ${id}`, error);
        throw error;
      }
    }),
  );
};
