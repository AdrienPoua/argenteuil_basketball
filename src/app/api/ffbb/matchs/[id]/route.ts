import { validateUser } from '@/lib/api/validateUser';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import { processMatchsFromFFBB } from '@/actions/hydrate/matchs';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';

const { MATCHS: endpoint } = API_ENDPOINTS_FFBB;

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();
  // Check if the token is present
  const token = req.headers.get('Authorization')?.split(' ')[1];
  try {
    // Check if the token is present
    if (!token) return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });

    // Consume the API
    const response = await fetch(endpoint + params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Error from FFBB: ${response.statusText}` }, { status: response.status });
    }


    const data: Match[] = await response.json();
    const processedMatchs = await processMatchsFromFFBB(data);

    return NextResponse.json(processedMatchs, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}



export interface Match {
  id: number;
  numero: number;
  numeroJournee: number;
  idPoule: number;
  idOrganismeEquipe1: number;
  idOrganismeEquipe2: number;
  nomEquipe1: string;
  nomEquipe2: string;
  idEngagementEquipe1: number;
  idEngagementEquipe2: number;
  resultatEquipe1: number;
  resultatEquipe2: number;
  date: Date;
  horaire: string;
  salle: { id: number; numero: string; libelle: string };
  penaliteEquipe1: boolean;
  penaliteEquipe2: boolean;
  forfaitEquipe1: boolean;
  forfaitEquipe2: boolean;
  defautEquipe1: boolean;
  defautEquipe2: boolean;
  validee: boolean;
  remise: boolean;
  joue: boolean;
  handicap1: number | null;
  handicap2: number | null;
  dateSaisieResultat: string; // ISO 8601
  creation: string; // ISO 8601
  modification: string; // ISO 8601
  classementPouleAssociee: number | null;
}
