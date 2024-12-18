import { z } from "zod";

export type TCompetition = z.infer<typeof CompetitionSchema>;

const CategorieSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string(),
});

const SaisonSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string(),
  debut: z.string(),
  fin: z.string(),
  actif: z.string(),
});

const OrganismeSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  code: z.string().nullable(),
});

const PouleSchema = z.object({
  id: z.number(),
  nom: z.string(),
});

const ClassementSchema = z.object({
  organisme: OrganismeSchema,
  matchJoues: z.number(),
  points: z.number(),
  position: z.number(),
  gagnes: z.number(),
  perdus: z.number(),
  nuls: z.number(),
  pointsInitiaux: z.nullable(z.number()).nullable(),
  penalitesArbitrage: z.number().nullable(),
  penalitesEntraineur: z.number().nullable(),
  penalitesDiverses: z.number().nullable(),
  nombreForfaits: z.number().nullable(),
  nombreDefauts: z.number().nullable(),
  paniersMarques: z.number().nullable(),
  paniersEncaisses: z.number().nullable(),
  quotient: z.number().nullable(),
  difference: z.number().nullable(),
  horsClassement: z.boolean().nullable(),
});

const CompetitionSchema = z.object({
  id: z.number(),
  idCompetitionPere: z.nullable(z.number()),
  nom: z.string(),
  sexe: z.string(),
  categorie: CategorieSchema,
  code: z.string(),
  fils: z.array(z.unknown()),
  saison: SaisonSchema,
  typeCompetition: z.string(),
  liveStat: z.boolean(),
  creationEnCours: z.boolean(),
  publicationInternet: z.string(),
  classification: z.nullable(z.string()),
  organisme: OrganismeSchema,
  creation: z.string(),
  modification: z.string(),
  etat: z.string(),
  poules: z.array(PouleSchema),
  classements: z.array(ClassementSchema),
});
