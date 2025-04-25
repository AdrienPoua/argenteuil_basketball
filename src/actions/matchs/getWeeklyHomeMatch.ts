'use server';

import MatchService from '@/services/Match';

export async function getWeeklyHomeMatch() {
  return await MatchService.getWeeklyHomeMatch();
}
