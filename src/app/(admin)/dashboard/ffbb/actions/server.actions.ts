"use server";
import { ClubService } from "@/database/services/Club";
import getCompetitionsDetails from "@/services/api/getCompetitionsDetails";
import { MatchService } from "@/database/services/Match";
import {
  MatchType,
  CompetitionType,
  ClubType,
} from "../types/serverActions.types";
import argenteuil from "@/data/club.json";

const clubService = new ClubService();
const matchService = new MatchService();
const clubs = await clubService.getClubs();

export const upsertClub = async (club: {
  code: string;
  id: number;
  libelle: string;
}) => {
  if (!club.code || !club.id || !club.libelle) return;
  await clubService.upsert({ ...club, id: club.id.toString() });
};

export const updateClubs = async (
  competitionsDetails: Awaited<ReturnType<typeof getCompetitionsDetails>>,
) => {
  try {
    const competitions = competitionsDetails.flat(1);
    const classements = competitions.flatMap(
      (competition) => competition.classements,
    );
    const organismes = classements.map((club) => club.organisme);
    const uniqueOrganismes = Array.from(
      new Map(organismes.map((org) => [org.id, org])).values(),
    );
    await Promise.all(
      uniqueOrganismes.map((organisme) => upsertClub(organisme)),
    );
  } catch (err) {
    console.error("Error updating clubs:", err);
  }
};

export const updateMatchs = async (
  matchs: MatchType[],
  competitions: CompetitionType[],
) => {
  await Promise.all(
    matchs.map(async (match) => {
      const competition = findCompetition(match, competitions);
      const opponentClub = findOpponentClub(match, clubs);
      const payload = {
        ...match,
        id: match.id.toString(),
        competition: competition?.code ?? null,
        correspondant: opponentClub?.email ?? null,
      };
      await matchService.upsert(payload);
    }),
  );
};

const findCompetition = (match: MatchType, competitions: CompetitionType[]) => {
  const competition = competitions.find((competition) =>
    competition.poules.find((poule) => poule.id === match.idPoule),
  );
  return competition ?? null;
};

const findOpponentClub = (match: MatchType, clubs: ClubType[]) => {
  const homeGame = match.idOrganismeEquipe1 === argenteuil.id;
  if (homeGame) {
    return clubs.find(
      (club) => club.id === match.idOrganismeEquipe2.toString(),
    );
  } else {
    return clubs.find(
      (club) => club.id === match.idOrganismeEquipe1.toString(),
    );
  }
};