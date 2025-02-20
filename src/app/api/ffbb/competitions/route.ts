import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { cookies } from 'next/headers';
import { errorHandler } from '@/lib/utils/handleApiError';
const endpoint =
  'https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getCompetitionParOrganisme.ws?codeOrganisme=IDF0095019';

export async function GET(req: Request) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // Check if the token is present
  const cookieStore = cookies();
  const token = cookieStore.get('ffbb_token')?.value;

  try {
    // Check if the token is present
    if (!token) return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });

    // Consume the API
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Error from FFBB: ${response.statusText}` }, { status: response.status });
    }

    const data: Competition[] = await response.json();
    const competitions = data.map((compet) => ({ id: compet.id, label: compet.code }));

    return NextResponse.json(competitions, { status: 200 });
  } catch (error) {
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
