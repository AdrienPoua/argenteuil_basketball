'use server';
import MatchService from '@/services/Match';

type PropsType = {
  month?: string;
  place?: string;
  competition?: string;
  showUpcomingOnly?: boolean;
};

export const getMatchs = async ({ month, place, competition, showUpcomingOnly }: PropsType) => {
  return await MatchService.getMatchs({
    month,
    place,
    competition,
    showUpcomingOnly,
  });
};
