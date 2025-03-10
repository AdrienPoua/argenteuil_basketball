import { MatchSchema } from '@/lib/validation/Match';
import { z } from 'zod';
import { hydrateMatchs } from '../hydrate/matchs';
import MatchService from '@/services/Match';
import { Match } from '@/app/api/ffbb/matchs/[id]/route';

export const saveMatchsToDatabase = async (matchs: Match[]) => {
  const hydratedMatchs = await hydrateMatchs(matchs);
  const parsedMatchs = z.array(MatchSchema).parse(hydratedMatchs);
  await Promise.all(
    parsedMatchs.map(async (match) => {
      return await MatchService.upsert(match);
    }),
  );
};

export default saveMatchsToDatabase;
