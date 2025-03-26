import { NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { processCompetitions } from '@/actions/process/ProcessCompetitions';
const { COMPETITIONS: endpoint } = API_ENDPOINTS_FFBB;

export async function GET(req: Request) {
  try {
    // Check if the user is authenticated
    await validateUser();

    // Check if the token is present
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: "Token d'authentification FFBB manquant" }, { status: 401 });
    }

    // Consume the API
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      errorHandler(response.statusText, response.status); 
    }

    const data: Competition[] = await response.json();
    const competitions = processCompetitions(data);

    return NextResponse.json(competitions, { status: 200 });
  } catch (error) {
    console.error('Erreur dans la route competitions:', error);
    return errorHandler(error);
  }
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
export interface ReturnedCompetition {
  id: number;
  label: string;
}
