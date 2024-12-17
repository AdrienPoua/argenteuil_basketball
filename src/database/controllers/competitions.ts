import { z } from "zod";
import Competition from "@/database/models/Competition";
import CRUD from "@/database/crud";

const competitionCRUD = new CRUD(Competition);

type TCompetition = z.infer<typeof CompetitionsSchema>;

export async function upsert(compet: unknown): Promise<TCompetition | void> {
  try {
    const parsedCompetition = CompetitionsSchema.parse(compet);
    const competition = parsedCompetition.flat(1);
    competition.forEach((competition) =>
      competitionCRUD.upsert({ id: competition.id }, competition),
    );
  } catch (error) {
    console.error("Error parsing ranking:", error);
    throw error;
  }
}

// Sous-schéma pour la catégorie
const CategorieSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string(),
});

// Sous-schéma pour la saison
const SaisonSchema = z.object({
  id: z.number(),
  code: z.string(),
  libelle: z.string(),
  debut: z.string().datetime(), // Date ISO au format string
  fin: z.string().datetime(),
  actif: z
    .union([z.string(), z.boolean()])
    .transform((val) => val === "true" || val === true),
});

// Sous-schéma pour l'organisme
const OrganismeSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  code: z.string(),
});

// Sous-schéma pour les poules
const PouleSchema = z.object({
  id: z.number(),
  nom: z.string(),
});

// Sous-schéma pour les classements
const ClassementSchema = z.object({
  organisme: OrganismeSchema,
  matchJoues: z.number(),
  points: z.number(),
  position: z.number(),
  gagnes: z.number(),
  perdus: z.number(),
  nuls: z.number(),
  pointsInitiaux: z.number().nullable(),
  penalitesArbitrage: z.number(),
  penalitesEntraineur: z.number(),
  penalitesDiverses: z.number(),
  nombreForfaits: z.number(),
  nombreDefauts: z.number(),
  paniersMarques: z.number(),
  paniersEncaisses: z.number(),
  quotient: z.number(),
  difference: z.number(),
  horsClassement: z.boolean(),
});

// Schéma principal pour la compétition
const CompetitionSchema = z.object({
  id: z.number(),
  idCompetitionPere: z.number().nullable(),
  nom: z.string(),
  sexe: z.string(),
  categorie: CategorieSchema,
  code: z.string(),
  fils: z.array(z.unknown()), // Tableau générique pour `fils`
  saison: SaisonSchema,
  typeCompetition: z.string(),
  liveStat: z.boolean(),
  creationEnCours: z.boolean(),
  publicationInternet: z.string(),
  classification: z.string().nullable(),
  organisme: OrganismeSchema,
  creation: z.string().datetime(),
  modification: z.string().datetime(),
  etat: z.string(),
  poules: z.array(PouleSchema),
  classements: z.array(ClassementSchema),
});

// Schéma pour un tableau de compétitions
const CompetitionsSchema = z.array(CompetitionSchema);
