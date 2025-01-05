"use server";
import { MatchService } from "@/database/services/Match";
import { FormValues } from "../types/form.types";
import { revalidatePath } from "next/cache";
import { PropsType as MatchType } from "../types/card.types";
import Match from "@/models/Match";

const matchService = new MatchService();

export async function getMatchs() {
  return await matchService.getMatchs();
}

export async function deleteMatch(matchId: string) {
  return await matchService.deleteMatch(matchId);
}

export async function updateMatch(match: FormValues & { id: string }) {
  const date = new Date(`${match.date}T${match.time}`);
  await matchService.updateMatch({ date, salle: match.salle, id: match.id });
  revalidatePath("/dashboard/matchs");
}

export async function sendConvocation(match : MatchType["match"]) {
  return await Match.sendConvocation(match);
}