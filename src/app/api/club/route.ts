import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import ClubService from '@/services/Club';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError';
export async function GET(req: NextRequest) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const clubs = await ClubService.getClubs();
    return NextResponse.json(clubs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const club = ClubSchema.parse(body);
    const createdClub = await ClubService.createClub(club);
    return NextResponse.json(createdClub);
  } catch (error) {
    return errorHandler(error);
  }
}
