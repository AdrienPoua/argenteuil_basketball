'use server';
import ClubService from '@/services/Club';
import { Organisme } from '@/app/api/ffbb/organismes/[id]/route';
import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';
import { ReturnedCompetition as Competition } from '@/app/api/ffbb/competitions/route';
import { cookies } from 'next/headers';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const nextAuthCookie = cookies().get('next-auth.session-token');

export const fetchClubs = async (organismes: Organisme[]) => {
  try {
    const res = await fetch(`${baseUrl}/api/club/bulk`, {
      method: 'PUT',
      body: JSON.stringify(organismes),
      headers: {
        Cookie: nextAuthCookie?.name + '=' + nextAuthCookie?.value,
      },
    });
    console.log(await res.json());
  } catch (err) {
    console.error('Error updating clubs:', err);
  }
};

export const fetchMatchs = async (matchs: Match[], competitions: Competition[]) => {
  const clubs = await ClubService.getClubs();
  const payloads = matchs.map((match) => {
    const competition = competitions.find((competition) => competition.id === match.idPoule);
    const opponentId = getOpponentId(match);
    const opponentClub = clubs.find((club) => club.id === opponentId);
    const payload = {
      ...match,
      id: match.id.toString(),
      competition: competition?.label ?? null,
      correspondant: opponentClub?.email ?? null,
      salle: match.salle?.libelle ?? "Salle inconnue",
    };
    return payload;
  });
  await fetch(`${baseUrl}/api/match/bulk`, {
    method: 'PUT',
    body: JSON.stringify(payloads),
    headers: {
      Cookie: nextAuthCookie?.name + '=' + nextAuthCookie?.value,
    },
  });
};

const getOpponentId = (match: Match) => {
  return match.idOrganismeEquipe1 === argenteuilIdOrganisme
    ? match.idOrganismeEquipe2.toString()
    : match.idOrganismeEquipe1.toString();
};
