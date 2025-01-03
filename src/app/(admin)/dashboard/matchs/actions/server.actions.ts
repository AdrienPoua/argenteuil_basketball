"use server";
import { MatchService } from "@/database/services/Match";

const matchService = new MatchService();    

export async function getMatchs() {
  return await matchService.getMatchs();
}

export async function deleteMatch(matchId: string) {
  return await matchService.deleteMatch(matchId);
}

export async function updateMatch(match : any) {
  return await matchService.updateMatch(match);
}
