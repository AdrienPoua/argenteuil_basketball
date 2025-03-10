'use server';
import MatchService from '@/services/Match';
import TeamService from '@/services/Team';
import { revalidatePath } from 'next/cache';
import { ConvocationService } from '@/integrations/nodemailer/services/convocation';
import Match from '@/models/Match';
import { AskConvocationService } from '@/integrations/nodemailer/services/ask-convocation';



export async function sendConvocation(match: ReturnType<Match['toPlainObject']>) {
  const team = await TeamService.getTeamByChampionnat(match.championnat);
  const convocation = new ConvocationService(match, team?.coach?.email);
  const result = await convocation.send();
  if (result) {
    await MatchService.updateMatch({ id: match.id, convocationIsSent: true });
    revalidatePath('/dashboard/matchs');
  }
}
export async function askConvocation(match: ReturnType<Match['toPlainObject']>) {
  const team = await TeamService.getTeamByChampionnat(match.championnat);
  const convocation = new AskConvocationService(match, team?.coach?.email);
  await convocation.send();
}
