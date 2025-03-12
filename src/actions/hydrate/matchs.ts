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
