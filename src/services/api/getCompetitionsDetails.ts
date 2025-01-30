import HTTPRequest from '@/models/HTTPRequest';
import { z } from 'zod';

export default async function getCompetitionsDetails(token: string, ids: number[]) {
  const requests = ids.map((id) => {
    return new HTTPRequest.Builder()
      .setUrl('/api/ffbb/getCompetitionsDetails')
      .setMethod('POST')
      .addHeader('Content-Type', 'application/json')
      .addHeader('Authorization', `Bearer ${token}`)
      .setBody(JSON.stringify(id))
      .build();
  });

  return (await Promise.all(requests.map((request) => request.send()))) as Competition[];
}

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
  code: z.string(),
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
  pointsInitiaux: z.nullable(z.number()),
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

const CompetitionSchema = z.array(
  z.object({
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
  }),
);

// Type inference
type Competition = z.infer<typeof CompetitionSchema>;
