import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import getCompetitions from '@/actions/fetchs/ffbb/getCompetitions';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';
import ClubService from '@/services/Club';

const getOpponentId = (match: Match) => {
  return match.idOrganismeEquipe1 === argenteuilIdOrganisme
    ? match.idOrganismeEquipe2.toString()
    : match.idOrganismeEquipe1.toString();
};

export const hydrateMatchs = async (matchs: Match[]) => {
  const clubs = await ClubService.getClubs();
  const competitions = await getCompetitions();
  return matchs.map((match: Match) => {
    const competition = competitions.find((comp) => comp.id === match.idPoule);
    const opponentId = getOpponentId(match);
    const opponentClub = clubs.find((club) => club.id === opponentId);

    return {
      ...match,
      id: match.id.toString(),
      competition: competition?.label ?? null,
      correspondant: opponentClub?.email ?? null,
      salle: match.salle?.libelle ?? 'Salle inconnue',
    };
  });
};

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
