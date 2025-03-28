import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';

const { MATCHS: endpoint } = API_ENDPOINTS_FFBB;

export default async function getMatchs(token: string, poulesIds: number[]) {
  try {
    const matchs = await Promise.all(
      poulesIds.map(async (poule) => {
        const res = await fetch(`${endpoint}${poule}`, {
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
}

export const processMatchsFromFFBB = async (matchs: Match[]) => {
  const plannedMatchs = matchs.filter((match) => isMatchReallyPlanned(match) && isABBPlaying(match));
  return plannedMatchs.map((match) => {
    return addDateToMatch(match);
  });
};

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
