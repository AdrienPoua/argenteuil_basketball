import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from '@/lib/utils/handleApiError';
import saveMatchsToDatabase from '@/actions/fetchs/database/upsertMatchsFromFFBB';

const { FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, CRON_SECRET } = process.env;
if (!FFBB_SERVER_USERNAME || !FFBB_SERVER_PASSWORD || !CRON_SECRET) {
  throw new Error('FFBB_SERVER_USERNAME, FFBB_SERVER_PASSWORD, CRON_SECRET are not set');
}

// Cette fonction sera exécutée lorsque la route est appelée
export async function GET(req: NextRequest) {
  try {
    // Verify if the cron job is authorized
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }

    // Get the token
    await saveMatchsToDatabase();

    return NextResponse.json({ message: 'Clubs et matchs mis à jour avec succès', status: 200 });
  } catch (error) {
    return errorHandler('Erreur lors de la mise à jour automatique des données FFBB: ' + error, 500);
  }
}
