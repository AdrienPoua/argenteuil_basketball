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
    const ids: number[] = JSON.parse(await req.json());
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      throw new Error('Missing Authorization header');
    }

    const responses: Rencontre[][] = await Promise.all(
      ids.map((id) => {
        const request = new HTTPRequest.Builder()
          .setUrl(`https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getRencontresParPoule.ws?idPoule=${id}`)
          .addHeader('Authorization', `Bearer ${token}`)
          .addHeader('Content-Type', 'application/json')
          .addHeader('Accept', 'application/json')
          .build();

        return request.send();
      }),
    );

    const filteredResponses = responses
      .flat(1)
      .filter((response) => response.idOrganismeEquipe1 === idOrganisme || response.idOrganismeEquipe2 === idOrganisme);

    return NextResponse.json(filteredResponses, { status: 200 });
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

type Salle = {
  id: number;
  numero: string;
  libelle: string;
};

type Rencontre = {
  id: number;
  numero: number;
  numeroJournee: number;
  idPoule: number;
  idOrganismeEquipe1: number;
  idOrganismeEquipe2: number;
  nomEquipe1: string;
  nomEquipe2: string;
  idEngagementEquipe1: number;
  idEngagementEquipe2: number;
  resultatEquipe1: number;
  resultatEquipe2: number;
  date: string; // Format "YYYY-MM-DD"
  salle: Salle;
  penaliteEquipe1: boolean;
  penaliteEquipe2: boolean;
  forfaitEquipe1: boolean;
  forfaitEquipe2: boolean;
  defautEquipe1: boolean;
  defautEquipe2: boolean;
  validee: boolean;
  remise: boolean;
  joue: boolean;
  handicap1: number | null;
  handicap2: number | null;
  dateSaisieResultat: string; // ISO 8601
  creation: string; // ISO 8601
  modification: string; // ISO 8601
  classementPouleAssociee: number | null;
};
