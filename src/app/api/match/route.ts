import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import MatchService from '@/services/Match';
import { errorHandler } from '@/lib/utils/handleApiError';

export async function GET() {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const matchs = await MatchService.getMatchs();
    return NextResponse.json(matchs);
  } catch (error) {
    return errorHandler(error);
  }
}
