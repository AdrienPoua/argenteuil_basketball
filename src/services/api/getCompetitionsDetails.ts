import HTTPRequest from "@/models/HTTPRequest";

export default async function getCompetitionsDetails(
  token: string,
  ids: number[],
) {
  const requests = ids.map((id) => {
    return new HTTPRequest.Builder()
      .setUrl("/api/ffbb/getCompetitionsDetails")
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .addHeader("Authorization", `Bearer ${token}`)
      .setBody(JSON.stringify(id))
      .build();
  });

  return await Promise.all(requests.map((request) => request.send()));
}

// Définition des types de base pour l'objet
type Categorie = {
  id: number;
  code: string;
  libelle: string;
};

type Saison = {
  id: number;
  code: string;
  libelle: string;
  debut: string; // Date ISO string
  fin: string; // Date ISO string
  actif: string; // Booléen sous forme de chaîne
};

type Organisme = {
  id: number;
  libelle: string;
  code: string;
};

type Poule = {
  id: number;
  nom: string;
};

type Classement = {
  organisme: Organisme;
  matchJoues: number;
  points: number;
  position: number;
  gagnes: number;
  perdus: number;
  nuls: number;
  pointsInitiaux: number | null;
  penalitesArbitrage: number;
  penalitesEntraineur: number;
  penalitesDiverses: number;
  nombreForfaits: number;
  nombreDefauts: number;
  paniersMarques: number;
  paniersEncaisses: number;
  quotient: number;
  difference: number;
  horsClassement: boolean;
};

type Competition = {
  id: number;
  idCompetitionPere: number | null;
  nom: string;
  sexe: string;
  categorie: Categorie;
  code: string;
  fils: any[]; // Array vide ou structure potentielle à définir
  saison: Saison;
  typeCompetition: string;
  liveStat: boolean;
  creationEnCours: boolean;
  publicationInternet: string;
  classification: string | null;
  organisme: Organisme;
  creation: string; // Date ISO string
  modification: string; // Date ISO string
  etat: string;
  poules: Poule[];
  classements: Classement[];
};

// Type pour un tableau de compétitions
type Competitions = Competition[];
