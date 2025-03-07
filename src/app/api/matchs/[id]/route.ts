import { NextResponse, NextRequest } from 'next/server';
import MatchService from '@/services/Match';
import { MatchSchema } from '@/lib/validation/Match';
import { errorHandler } from '@/lib/utils/handleApiError';
import { Prisma } from '@prisma/client';
import { validateUser } from '@/lib/api/validateUser';
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();

  try {
    const body = await req.json();
    const match = MatchSchema.partial().parse(body);
    const updatedMatch = await MatchService.updateMatch({ ...match, id: params.id });
    return NextResponse.json(
      {
        message: 'Match updated',
        data: updatedMatch,
      },
      { status: 200 },
    );
  } catch (error) {
    // If the error is a Prisma error and the code is P2025 (record not found), return a 404 error (not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    return errorHandler(error); // Gère les autres erreurs normalement
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();

  try {
    const deletedMatch = await MatchService.deleteMatch(params.id);
    return NextResponse.json({ message: 'Match deleted', data: deletedMatch }, { status: 200 });
  } catch (error) {
    // If the error is a Prisma error and the code is P2025 (record not found), return a 404 error (not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    return errorHandler(error); // Gère les autres erreurs normalement
  }
}
