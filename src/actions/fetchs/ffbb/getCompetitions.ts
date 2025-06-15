'use server';

import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { errorHandler } from '@/lib/utils/handleApiError';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

export default async function getCompetitions(token: string) {
  const response = await fetch(API_ENDPOINTS_FFBB.COMPETITIONS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    errorHandler(response.statusText, response.status);
  }
  const data: Competition[] = await response.json();
  console.log("🚀 ~ getCompetitions ~ data:", data)
  return data.map((compet) => ({ id: compet.id, label: compet.code, poules: compet.poules }));
}
export interface Competition {
  id: number;
  idCompetitionPere: number | null;
  nom: string;
  sexe: 'M' | 'F' | 'X'; // Masculin, Féminin ou Mixte
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
    actif: 'true' | 'false';
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
}
