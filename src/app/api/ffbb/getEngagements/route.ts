import { NextResponse } from 'next/server';
import HTTPRequest from '@/models/HTTPRequest';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/services/nextAuth/auth';

const idOrganisme = 11851;
const codeOrganisme = 'IDF0095019';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      throw new Error('Missing Authorization header');
    }

    const request = new HTTPRequest.Builder()
      .setUrl(
        `https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getEngagementsParOrganisme.ws?idOrganisme=11851`,
      )
      .addHeader('Authorization', `Bearer ${token}`)
      .addHeader('Content-Type', 'application/json')
      .addHeader('Accept', 'application/json')
      .build();

    const response: Engagement[] = await request.send();
    return NextResponse.json(response, { status: 200 });
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

type Niveau = {
  id: number;
  code: string;
  libelle: string;
} | null;

type Engagement = {
  idEngagement: number;
  idOrganisme: number;
  idOrganismeCtc: number | null;
  nomEquipe: string | null;
  typeEntenteCtc: string | null;
  idLicenceCorrespondantEquipe: number;
  nomCorrespondantEquipe: string;
  adresseCorrespondantEquipe: string;
  complementAdresseCorrespondantEquipe: string;
  communeCorrespondantEquipe: string;
  telephoneFixeCorrespondantEquipe: string;
  telephoneTravailCorrespondantEquipe: string;
  telephonePortableCorrespondantEquipe: string;
  emailCorrespondantEquipe: string;
  clubPro: boolean;
  idCompetition: number;
  idPoule: number;
  numeroEquipe: string;
  niveau: Niveau;
};
