"use server";
import { ClubService } from "@/database/services/Club";
import getCompetitions from "@/services/api/getCompetitions";
import getCompetitionsDetails from "@/services/api/getCompetitionsDetails";
import getRencontresParPoules from "@/services/api/getRencontresParPoules";
import { MatchService } from "@/database/services/Match";

const clubService = new ClubService();
const matchService = new MatchService();

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
  matchs: Awaited<ReturnType<typeof getRencontresParPoules>>,
  competitions: Awaited<ReturnType<typeof getCompetitions>>,
) => {
  const findCompetition = (match: any) => {
    const competition = competitions.find((competition) =>
      competition.poules.find((poule) => poule.id === match.idPoule),
    );
    return competition ?? null;
  };

  await Promise.all(
    matchs.map(async (match) => {
      const competition = findCompetition(match);
      const payload = {
        ...match,
        id: match.id.toString(),
        competition: competition?.code ?? null,
      };
      await matchService.upsert(payload);
    }),
  );
};
