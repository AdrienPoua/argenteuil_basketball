import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import { cookies } from 'next/headers';

const endpoint =
  'https://ffbbserver3.ffbb.com/ffbbserver3/api/competition/getEngagementsParOrganisme.ws?idOrganisme=11851';

export async function GET(req: NextRequest) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    // Check if the token is present
    const token = cookies().get('ffbb_token')?.value;
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

    const data: Engagement[] = await response.json();
    const ids = data.map((data) => data.idPoule);

    return NextResponse.json(ids);
  } catch (error) {
    console.error('Unexpected error in poules API route:', error);
    return NextResponse.json(
      {
        error: `Unexpected error in poules API route: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}

interface Engagement {
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
  niveau: {
    id: number;
    code: string;
    libelle: string;
  } | null;
}
