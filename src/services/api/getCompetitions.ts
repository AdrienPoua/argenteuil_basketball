import HTTPRequest from "@/models/HTTPRequest";


export default async function getCompetitions(token: string) {
  const request = new HTTPRequest.Builder()
    .setUrl("/api/ffbb/getCompetitions")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", `Bearer ${token}`)
    .build();

  return await request.send() as Competition[];
}

type Competition = {
  id: number;
  idCompetitionPere: number | null;
  nom: string;
  sexe: "M" | "F" | "X"; // Masculin, Féminin ou Mixte
  categorie: {
    id: number;
    code: string;
    libelle: string;
  };
  code: string;
  fils: Competition[]; // Liste de compétitions filles si applicable
  saison: {
    id: number;
    code: string;
    libelle: string;
    debut: string; // Format "JJ/MM/AAAA"
    fin: string; // Format "JJ/MM/AAAA"
    actif: "true" | "false";
  };
  typeCompetition: string; // Exemple : "DIV" ou "PLAT"
  liveStat: boolean;
  creationEnCours: boolean;
  publicationInternet: string; // Exemple : "AFF"
  emarqueV2: boolean;
  classification: unknown;
  organisme: {
    id: number;
    libelle: string;
    code: string;
  };
  creation: string | null; // Date ou null
  modification: string | null; // Date ou null
  etat: unknown;
  poules: {
    id: number;
    nom: string;
  }[];
  classements: unknown[]; // Liste vide ou définie par ailleurs
};
