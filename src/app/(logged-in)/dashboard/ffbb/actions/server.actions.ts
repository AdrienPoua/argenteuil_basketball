'use server';
import { Organisme } from '@/app/api/ffbb/organismes/[id]/route';
import { Match } from '@/app/api/ffbb/matchs/[id]/route';
import { ReturnedCompetition as Competition } from '@/app/api/ffbb/competitions/route';
import { cookies } from 'next/headers';
import { errorHandler } from '@/lib/utils/handleApiError';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const nextAuthCookie = cookies().get('next-auth.session-token');

export const updateClubs = async (organismes: Organisme[]) => {
  try {
    const res = await fetch(`${baseUrl}/api/clubs`, {
      method: 'PUT',
      body: JSON.stringify(organismes),
      headers: {
        Cookie: nextAuthCookie?.name + '=' + nextAuthCookie?.value,
      },
    });
    console.log(await res.json());
  } catch (err) {
    console.error('Error updating clubs:', err);
  }
};

export const updateMatchs = async (matchs: Match[], competitions: Competition[]) => {
  try {
    const response = await fetch(`${baseUrl}/api/matchs`, {
      method: 'PUT',
      body: JSON.stringify({ matchs, competitions }),
      headers: {
        Cookie: nextAuthCookie?.name + '=' + nextAuthCookie?.value,
      },
    });

    if (!response.ok) {
      errorHandler(response);
    }

    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};
