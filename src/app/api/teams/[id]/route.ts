import { NextResponse, NextRequest } from 'next/server';
import TeamService from '@/services/Team';
import { errorHandler } from '@/lib/utils/handleApiError';
import { Prisma } from '@prisma/client';
import { TeamSchema } from '@/lib/validation/Team';
import { z } from 'zod';
import { validateUser } from '@/lib/api/validateUser';
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();

  try {
    const body = await req.json();
    const team = TeamSchema.omit({ coach: true }).extend({ coach: z.string().optional() }).parse(body);
    // update match
    const teamUpdate = await TeamService.updateTeam({ ...team, id: params.id });
    console.log('Team updated', teamUpdate);

    // Return 200
    return NextResponse.json({ message: 'Success', data: teamUpdate }, { status: 200 });
  } catch (error) {
    // If the error is a Prisma error and the code is P2025 (record not found), return a 404 error (not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    return errorHandler(error); // Gère les autres erreurs normalement
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();

  try {
    const deletedTeam = await TeamService.deleteTeam(params.id);
    console.log('Team deleted', deletedTeam);
    return NextResponse.json({ message: 'Team deleted', data: deletedTeam }, { status: 200 });
  } catch (error) {
    // If the error is a Prisma error and the code is P2025 (record not found), return a 404 error (not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    return errorHandler(error); // Gère les autres erreurs normalement
  }
}
