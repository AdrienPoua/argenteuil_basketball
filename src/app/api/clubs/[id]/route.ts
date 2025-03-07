import { NextResponse } from 'next/server';
import clubService from '@/services/Club';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';
// GET /api/clubs/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  await validateUser();

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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await validateUser();

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
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await validateUser();

  try {
    await clubService.deleteClub(params.id);
    return NextResponse.json({ message: 'Club supprimé avec succès' });
  } catch (error) {
    return errorHandler(error);
  }
}
