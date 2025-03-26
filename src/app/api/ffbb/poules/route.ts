import { NextResponse, NextRequest } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';

const { POULES: endpoint } = API_ENDPOINTS_FFBB;

export async function GET(req: NextRequest) {
  // Check if the user is authenticated
  await validateUser();
  try {
    // Check if the token is present
    const token = req.headers.get('Authorization')?.split(' ')[1];
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
    return errorHandler(error);
  }
}

export interface Engagement {
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
