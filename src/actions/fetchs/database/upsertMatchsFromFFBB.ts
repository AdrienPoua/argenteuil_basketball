'use server';
import { validateUser } from '@/lib/api/validateUser';
import getToken from '@/actions/fetchs/ffbb/getFFBBToken';
import MatchService from '@/services/Match';
import ClubService from '@/services/Club';

import getMatchs from '../ffbb/getMatchs';
import getPoulesIds from '../ffbb/getPoulesIds';
import getCompetitions from '../ffbb/getCompetitions';
import { z } from 'zod';
import { MatchSchema } from '@/lib/validation/Match';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';
/**
 * Refresh all matches data from FFBB
 */
export default async function saveMatchsToDatabase() {
  try {
    // Get the token
    const token = await getToken();

    // Get the poules ids
    const poulesIds = await getPoulesIds(token);

    // Get the matchs
    const matchs = await getMatchs(token, poulesIds);
    console.log("🚀 ~ saveMatchsToDatabase ~ matchs:", matchs.filter((match) => match.resultatEquipe2 === 77))

    // get the competitions
    const competitions = await getCompetitions(token);
    console.log("🚀 ~ saveMatchsToDatabase ~ competitions:", competitions.filter((comp) => comp.label === 'PRM'))
    console.log("🚀 ~ saveMatchsToDatabase ~ matchs:", matchs.filter((match) => match.idPoule === 1))

    // get the clubs from my own database
    const clubs = await ClubService.getClubs();

    // Save the matchs to the database
    const hydratedMatchs = matchs.map((match) => {
      const competition = competitions.find((comp) => comp.poules.some((poule) => poule.id === match.idPoule));
      console.log("🚀 ~ hydratedMatchs ~ competition:", competition)
      const opponentId =
        match.idOrganismeEquipe1 === argenteuilIdOrganisme
          ? match.idOrganismeEquipe2.toString()
          : match.idOrganismeEquipe1.toString();
      const opponentClub = clubs.find((club) => club.id === opponentId);

      return {
        ...match,
        id: match.id.toString(),
        competition: competition?.label ?? null,
        correspondant: opponentClub?.email ?? null,
        salle: match.salle?.libelle ?? 'Salle inconnue',
      };
    });

    const parsedMatchs = z.array(MatchSchema).parse(hydratedMatchs);

    await Promise.all(
      parsedMatchs.map(async (match) => {
        return await MatchService.upsert(match);
      }),
    );

    return { success: true, message: 'Matchs mis à jour avec succès' };
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données FFBB:', error);
    throw new Error('Erreur lors de la mise à jour des données FFBB');
  }
}
