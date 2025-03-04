import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import clubService from '@/services/Club';
import { z } from 'zod';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError';

// GET /api/clubs/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const club = await clubService.getClub(params.id);
    if (!club) {
      return NextResponse.json({ error: 'Club non trouvé' }, { status: 404 });
    }
    return NextResponse.json(club);
  } catch (error) {
    return errorHandler(error);
  }
}

// PUT /api/clubs/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = ClubSchema.parse({ ...body, id: params.id });
    const updatedClub = await clubService.updateClub(validatedData);
    return NextResponse.json(updatedClub);
  } catch (error) {
    return errorHandler(error);
  }
}

// DELETE /api/clubs/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    await clubService.deleteClub(params.id);
    return NextResponse.json({ message: 'Club supprimé avec succès' });
  } catch (error) {
    return errorHandler(error);
  }
}
