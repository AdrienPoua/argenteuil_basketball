import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import ClubService from '@/services/Club';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError';
export async function PUT(req: NextRequest) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const club = ClubSchema.parse(body);
    const updatedClub = await ClubService.updateClub(club);
    return NextResponse.json(updatedClub);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const deletedClub = await ClubService.deleteClub(params.id);
    return NextResponse.json(deletedClub);
  } catch (error) {
    return errorHandler(error);
  }
}
