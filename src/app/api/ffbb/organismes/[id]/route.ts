import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { cookies } from 'next/headers';
import { Competition } from '../../competitions/route';

const endpoint = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getCompetition.ws?id=';

export async function GET(req: Request, { params }: { params: { id: string } }) {
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
    const response = await fetch(endpoint + params.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Error from FFBB: ${response.statusText}` }, { status: response.status });
    }

    const data: CompetitionWithClassements[] = await response.json();
    const organismes = data
      .map((competition) => competition.classements.map((classemement) => classemement.organisme))
      .flat();
    const organismeWithStringId = organismes.map((organisme) => ({ ...organisme, id: organisme.id.toString() }));
    const filteredOrganisme = organismeWithStringId.filter(
      (organisme) => organisme.code && organisme.id && organisme.libelle,
    );
    return NextResponse.json(filteredOrganisme);
  } catch (error) {
    console.error('Unexpected error in organismes API route:', error);
    return NextResponse.json(
      {
        error: 'Unexpected error in organismes API route:',
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

interface CompetitionWithClassements extends Competition {
  classements: {
    organisme: {
      id: number;
      libelle: string;
      code: string;
    };
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
  }[];
}

export interface Organisme {
  id: string;
  libelle: string;
  code: string;
}
