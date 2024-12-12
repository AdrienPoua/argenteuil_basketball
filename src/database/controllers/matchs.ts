"use server";

import Match from "@/database/models/Match";
import CRUD from "@/database/crud";
import { z } from "zod";

const matchCrud = new CRUD(Match);

const matchSchema = z.object({
  id: z.number(),
  numero: z.number(),
  numeroJournee: z.number(),
  idPoule: z.number(),
  idOrganismeEquipe1: z.number(),
  idOrganismeEquipe2: z.number(),
  nomEquipe1: z.string(),
  nomEquipe2: z.string(),
  resultatEquipe1: z.number(),
  resultatEquipe2: z.number(),
  date: z.string(),
  horaire: z.number(),
  salle: z.object({
    id: z.number(),
    numero: z.string(),
    libelle: z.string(),
  }),
  penaliteEquipe1: z.boolean(),
  penaliteEquipe2: z.boolean(),
  forfaitEquipe1: z.boolean(),
  forfaitEquipe2: z.boolean(),
  defautEquipe1: z.boolean(),
  defautEquipe2: z.boolean(),
  validee: z.boolean(),
  remise: z.boolean(),
  joue: z.boolean(),
  handicap1: z.number().nullable(),
  handicap2: z.number().nullable(),
  dateSaisieResultat: z.string(),
  creation: z.string(),
  modification: z.string(),
  classementPouleAssociee: z.unknown().nullable(),
});
type TMatch = z.infer<typeof matchSchema>;

export async function createMatch(match: TMatch): Promise<TMatch> {
  return matchCrud.create(match);
}

export async function getMatchs(): Promise<TMatch[]> {
  const matchs = await matchCrud.read();
  return matchs.toSorted(
    (a, b) => parseInt(a.matchNumber) - parseInt(b.matchNumber),
  );
}
