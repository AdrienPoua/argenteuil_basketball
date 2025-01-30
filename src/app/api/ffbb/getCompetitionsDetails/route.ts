import { NextResponse } from 'next/server';
import HTTPRequest from '@/models/HTTPRequest';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/services/nextAuth/auth';

const idOrganisme = 11851;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const id: number = JSON.parse(await req.json());
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      throw new Error('Missing Authorization header');
    }

    const request = new HTTPRequest.Builder()
      .setUrl(`https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getCompetition.ws?id=${id}`)
      .addHeader('Authorization', `Bearer ${token}`)
      .addHeader('Content-Type', 'application/json')
      .addHeader('Accept', 'application/json')
      .build();

    const responses: Competition[] = await request.send();

    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in getRencontres API route:', error);
    return NextResponse.json(
      {
        error: 'Unexpected error in getRencontres API route:',
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
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
