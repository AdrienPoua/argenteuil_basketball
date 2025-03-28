import { NextRequest, NextResponse } from 'next/server';
import MatchService from '@/services/Match';
import { errorHandler } from '@/lib/utils/handleApiError';
import { MatchSchema } from '@/lib/validation/Match';
import { z } from 'zod';
import { validateUser } from '@/lib/api/validateUser';
import saveMatchsToDatabase from '@/actions/fetchs/database/upsertMatchsFromFFBB';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');

export async function GET() {
  // Check if the user is authenticated
  await validateUser();

  try {
    const matchs = await MatchService.getMatchs();
    return NextResponse.json(matchs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  await validateUser();
  try {
    const { matchs } = await req.json();
    await saveMatchsToDatabase(matchs);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error in process-matchs route:', error);
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest) {
  // Check if the user is authenticated with the token in the cookie
  await validateUser();

  try {
    const body = await req.json();

    // Validate entries
    const matchs = z.array(MatchSchema).parse(body);

    // Upsert matches
    const matchsUpserted = await Promise.all(
      matchs.map(async (match) => {
        return await MatchService.upsert(match);
      }),
    );

    // log it
    console.log('Matchs upserted', matchsUpserted);

    // Return 200
    return NextResponse.json({ message: 'Success', data: matchsUpserted }, { status: 200 });

    // Return 200
  } catch (error) {
    return errorHandler(error);
  }
}
