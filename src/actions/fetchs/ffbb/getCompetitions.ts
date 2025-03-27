import { processCompetitions } from '@/actions/process/ProcessCompetitions';
import getToken from './getToken';
import { getSessionCookie } from '@/actions/process/getSessionCookie';
import { Competition } from '@/app/api/ffbb/competitions/route';
import { API_ENDPOINTS_FFBB } from '@/lib/constants/api-endpoints-ffbb';
import { errorHandler } from '@/lib/utils/handleApiError';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

const getCompetitions = async () => {
  try {
    // Récupère le token de FFBB
    const token = await getToken();
    const nextAuthCookie = getSessionCookie();

    // Récupère les compétitions
    const res = await fetch(`${baseUrl}/api/ffbb/competitions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `${nextAuthCookie.name}=${nextAuthCookie.value}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch competitions', { cause: { status: res.status } });
    }
    const data = (await res.json()) as { id: number; label: string }[];
    return data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
};

export const getUnloggedCompetitions = async () => {
  try {
    // Récupère le token de FFBB
    const token = await getToken();
    console.log('🚀 ~ getUnloggedCompetitions ~ token:', token);

    // Récupère les compétitions
    const response = await fetch(API_ENDPOINTS_FFBB.COMPETITIONS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      errorHandler(response.statusText, response.status);
    }
    console.log('🚀 ~ getUnloggedCompetitions ~ response:', response);
    const data = (await response.json()) as { id: number; label: string }[];
    return data;
  } catch (error) {
    console.error('Error in unlogged competitions fetch:', error);
    throw error;
  }
};

export default getCompetitions;
