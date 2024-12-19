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
  resultatEquipe1: z.number().nullable(),
  resultatEquipe2: z.number().nullable(),
  date: z.date(),
  salle: z.string(),
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
  dateSaisieResultat: z.string().nullable(),
  creation: z.string(),
  modification: z.string().nullable(),
  classementPouleAssociee: z.number().nullable(),
  competition: z.string(),
});

type TMatch = z.infer<typeof matchSchema>;

export async function CreateOrUpdate(match: unknown): Promise<TMatch | void> {
  const parsedMatch = matchSchema.parse(match);
  const existingMatch = await matchCrud.findOne({ numero: parsedMatch.numero });
  if (existingMatch) {
    await matchCrud.update(
      { numero: parsedMatch.numero },
      {
        joue: parsedMatch.joue,
        remise: parsedMatch.remise,
        forfaitEquipe1: parsedMatch.forfaitEquipe1,
        forfaitEquipe2: parsedMatch.forfaitEquipe2,
        resultatEquipe1: parsedMatch.resultatEquipe1,
        resultatEquipe2: parsedMatch.resultatEquipe2,
      },
    );
    return JSON.parse(JSON.stringify(parsedMatch));
  } else {
    return matchCrud.create(parsedMatch);
  }
}

export async function updateMatch(match: TMatch) {
  return matchCrud.update(
    { numero: match.numero },
    { date: match.date, remise: match.remise, salle: match.salle },
  );
}

export async function getMatchs(): Promise<
  Omit<TMatch, "date" & { date: string }>[]
> {
  return await matchCrud.read();
}

export async function deleteMatch(match: TMatch) {
  return matchCrud.remove({ numero: match.numero });
}
