"use server";
import { MatchService } from "@/database/services/Match";
import { TeamService } from "@/database/services/Team";
import { FormValues } from "../types/form.types";
import { revalidatePath } from "next/cache";
import { ConvocationService } from "@/services/nodemailer/services/convocation";
import Match from "@/models/Match";

const matchService = new MatchService();
const teamService = new TeamService();

export async function getMatchs() {
  return await matchService.getMatchs();
}

export async function getTeams() {
  return await teamService.getTeams();
}

export async function deleteMatch(matchId: string) {
  return await matchService.deleteMatch(matchId);
}

export async function updateMatch(match: FormValues & { id: string }) {
  const hours = match.time.split(":")[0]
  const minutes = match.time.split(":")[1]
  match.date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  console.log(match.date)
  await matchService.updateMatch({ date : match.date, salle: match.salle, id: match.id });
  revalidatePath("/dashboard/matchs");
}

export async function sendConvocation(
  match: ReturnType<Match["toPlainObject"]>,
) {
  const team = await teamService.getTeamByChampionnat(match.championnat);
  const convocation = new ConvocationService(match, team?.coach?.email);
  const result = await convocation.send();
  if (result) {
    await matchService.updateMatch({ id: match.id, convocationIsSent: true });
    revalidatePath("/dashboard/matchs");
  }
}
