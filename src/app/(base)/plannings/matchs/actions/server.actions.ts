"use server";

import { MatchService } from '@/database/services/Match';

const matchService = new MatchService();

export const getMatchs = async () => {
    return await matchService.getMatchs();
}