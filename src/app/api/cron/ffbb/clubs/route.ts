import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import upsertClubsFromFFBB from '@/actions/fetchs/database/upsertClubsFromFFBB';

const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, NEXT_PUBLIC_BASE_URL, CRON_SECRET } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD || !CRON_SECRET || !NEXT_PUBLIC_BASE_URL) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, CRON_SECRET, NEXT_PUBLIC_BASE_URL are not set');
}

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET(req: NextRequest) {
  try {
    // Verify if the cron job is authorized
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }

    await upsertClubsFromFFBB();

    return NextResponse.json({ message: 'Clubs sauvegardés avec succès', status: 200 });
  } catch (error) {
    console.error('Erreur dans la route clubs:', error);
    return errorHandler(error);
  }
}
