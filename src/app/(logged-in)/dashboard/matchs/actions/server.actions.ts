'use server';
import MatchService from '@/services/Match';
import TeamService from '@/services/Team';
import { revalidatePath } from 'next/cache';
import { ConvocationService } from '@/integrations/nodemailer/services/convocation';
import Match from '@/models/Match';

export async function getMatchs() {
  return await MatchService.getMatchs();
}

export async function getTeams() {
  return await TeamService.getTeams();
}

export async function deleteMatch(matchId: string) {
  return await MatchService.deleteMatch(matchId);
}

export async function updateMatch(match: { date: Date; salle: string } & { id: string }) {
  console.log('🚀 ~ updateMatch ~ match:', match);
  await MatchService.updateMatch({
    date: match.date,
    salle: match.salle,
    id: match.id,
  });
  revalidatePath('/dashboard/matchs');
}

export async function sendConvocation(match: ReturnType<Match['toPlainObject']>) {
  const team = await TeamService.getTeamByChampionnat(match.championnat);
  const convocation = new ConvocationService(match, team?.coach?.email);
  const result = await convocation.send();
  if (result) {
    await MatchService.updateMatch({ id: match.id, convocationIsSent: true });
    revalidatePath('/dashboard/matchs');
  }
}
