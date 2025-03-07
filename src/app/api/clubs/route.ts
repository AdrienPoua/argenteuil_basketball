import { NextResponse } from 'next/server';
import clubService from '@/services/Club';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';
import saveClubsToDatabase from '@/actions/process/saveClubsToDatabase';

export async function GET() {
  // Check if the user is authenticated
  await validateUser();

  try {
    const clubs = await clubService.getClubs();
    return NextResponse.json(clubs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  await validateUser();

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
  await validateUser();

  try {
    const clubs = await req.json();
    await saveClubsToDatabase(clubs);
    return NextResponse.json({ message: 'Success', data: clubs }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
