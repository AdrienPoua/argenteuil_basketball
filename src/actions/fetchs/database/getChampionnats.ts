'use server';

import MatchService from '@/services/Match';

export const getChampionnats = async () => {
  return await MatchService.getChampionnats();
};
