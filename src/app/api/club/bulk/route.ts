import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import ClubService from '@/services/Club';
import { ClubSchema } from '@/lib/validation/Club';
import { errorHandler } from '@/lib/utils/handleApiError'; 
 
export async function PUT(req: NextRequest) {
  // Check if the user is authenticated
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const clubs = ClubSchema.array().parse(body);
    const updatedClubs = await Promise.all(
      clubs.map(async (club) => {
        return await ClubService.upsert(club);
      }),
    );
    return NextResponse.json(updatedClubs);
  } catch (error) {
    return errorHandler(error);
  }
}
