import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import clubService from '@/services/Club';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError';
import { z } from 'zod';

export async function GET() {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const clubs = await clubService.getClubs();
    return NextResponse.json(clubs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await req.json();
    const validatedData = ClubSchema.parse(body);
    const club = await clubService.createClub(validatedData);
    return NextResponse.json(club, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: Request) {
  // Check if the user is authenticated with the token in the cookie
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const clubsArray = Array.isArray(body) ? body : [body];
    const clubs = z.array(ClubSchema).parse(clubsArray);

    // Upsert matches
    const clubsUpserted = await Promise.all(
      clubs.map(async (club) => {
        return await clubService.upsert(club);
      }),
    );

    // log it
    console.log('Clubs upserted', clubsUpserted);

    // Return 200
    return NextResponse.json({ message: 'Success', data: clubsUpserted }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
