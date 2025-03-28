import clubService from '@/services/Club';
import getToken from '../ffbb/getFFBBToken';
import getCompetitions from '../ffbb/getCompetitions';
import getClubs from '../ffbb/getClubs';
import { ClubSchema } from '@/lib/validation/Club';
import { z } from 'zod';

export default async function upsertClubsFromFFBB() {
  try {
    const token = await getToken();
    const competitions = await getCompetitions(token);
    const competitionsIds = competitions.map((competition) => competition.id);
    const clubs = await getClubs(token, competitionsIds);

    // Save Clubs to Database
    const parsedClubs = z.array(ClubSchema).parse(clubs);
    await Promise.all(
      parsedClubs.map(async (club) => {
        return await clubService.upsert(club);
      }),
    );

    return { success: true, message: 'Clubs sauvegardés avec succès' };
  } catch (error) {
    console.error('Erreur dans la route clubs:', error);
    throw new Error('Erreur dans la route clubs');
  }
}
