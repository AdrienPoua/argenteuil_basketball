import { NextResponse } from 'next/server';
import { validateUser } from '@/lib/api/validateUser';

import { Competition } from '../../competitions/route';
import { errorHandler } from '@/lib/utils/handleApiError';
const endpoint = 'https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getCompetition.ws?id=';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();
  // Check if the token is present
  const token = req.headers.get('Authorization')?.split(' ')[1];

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
    return errorHandler(error);
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
