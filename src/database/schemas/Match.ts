import { z } from "zod";

export const BaseMatchSchema = z.object({
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

export const upsertMatchSchema = BaseMatchSchema.extend({
  id: z.string().optional(),
});

export const ExistingMatchSchema = BaseMatchSchema.extend({
  id: z.string(),
});

