import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import MatchService from '@/services/Match';
import { MatchSchema } from '@/lib/validation/Match';
import { errorHandler } from '@/lib/utils/handleApiError';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const match = MatchSchema.parse(body);
    const updatedMatch = await MatchService.upsert({ ...match, id: params.id });
    return NextResponse.json(updatedMatch);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Unexpected error in match API route: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const deletedMatch = await MatchService.deleteMatch(params.id);
    return NextResponse.json(deletedMatch);
  } catch (error) {
    return errorHandler(error);
  }
}
