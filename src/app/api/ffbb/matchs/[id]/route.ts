import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';
import { errorHandler } from '@/lib/utils/handleApiError';
const endpoint = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getRencontresParPoule.ws?idPoule=';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // Check if the token is present
  const token = req.headers.get('Authorization')?.split(' ')[1];
  console.log(endpoint + params.id);
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
    const plannedMatchs = data.filter((match) => isMatchReallyPlanned(match) && isABBPlaying(match));
    const datedMatchs = plannedMatchs.map((match) => {
      return addDateToMatch(match);
    });
    return NextResponse.json(datedMatchs, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

const isMatchReallyPlanned = (match: Match) => {
  return match.idOrganismeEquipe1 && match.idOrganismeEquipe2;
};

const isABBPlaying = (match: Match) => {
  return match.idOrganismeEquipe1 === argenteuilIdOrganisme || match.idOrganismeEquipe2 === argenteuilIdOrganisme;
};

const addDateToMatch = (match: Match) => {
  // get the date object from the date string
  const date = new Date(match.date);
  // get the hours and minutes from the horaire string
  const horaireStr = String(match.horaire).padStart(4, '0');
  const hours = parseInt(horaireStr.slice(0, 2), 10);
  const minutes = parseInt(horaireStr.slice(-2), 10);
  // set the hours and minutes to the date object
  date.setHours(hours, minutes, 0, 0);
  // return the match with the date as a Date object
  return {
    ...match,
    date: date,
  };
};

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
