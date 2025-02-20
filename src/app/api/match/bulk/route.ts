import { NextResponse, NextRequest } from 'next/server';
import MatchService from '@/services/Match';
import { MatchSchema } from '@/lib/validation/Match';
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';
import { errorHandler } from '@/lib/utils/handleApiError';
export async function PUT(req: NextRequest) {
  // Check if the user is authenticated with the token in the cookie
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const matchs = z.array(MatchSchema).parse(body);

    matchs.forEach(async (match) => {
      await MatchService.upsert(match);
    });

    return NextResponse.json({ message: 'Matches upserted' }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
