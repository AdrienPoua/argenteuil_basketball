import { z } from 'zod';

export const MatchSchema = z.object({
  id: z.string(),
  numero: z.number(),
  numeroJournee: z.number(),
  idPoule: z.number(),
  idOrganismeEquipe1: z.number(),
  idOrganismeEquipe2: z.number(),
  nomEquipe1: z.string(),
  nomEquipe2: z.string(),
  resultatEquipe1: z.number().nullable(),
  resultatEquipe2: z.number().nullable(),
  date: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val), // 🔥 Transforme seulement si c'est une string
    z.date(),
  ),
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
  competition: z.string().nullable(),
  correspondant: z.string().nullable(),
  convocationIsSent: z.boolean().default(false),
  convocationIsAsked: z.boolean().default(false),
  isConvocationRecu: z.boolean().default(false),
});
