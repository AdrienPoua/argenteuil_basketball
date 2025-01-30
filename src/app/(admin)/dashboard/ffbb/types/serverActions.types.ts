import getCompetitions from '@/services/api/getCompetitions';
import getRencontresParPoules from '@/services/api/getRencontresParPoules';
import { Prisma } from '@prisma/client';

type getRencontresParPouleType = Awaited<ReturnType<typeof getRencontresParPoules>>;
type getCompetitionsType = Awaited<ReturnType<typeof getCompetitions>>;

export type MatchType = getRencontresParPouleType[0];
export type CompetitionType = getCompetitionsType[0];

export type updateMatchsType = (matchs: getRencontresParPouleType, competitions: getCompetitionsType) => Promise<void>;

export type ClubType = Prisma.ClubGetPayload<{}>;
