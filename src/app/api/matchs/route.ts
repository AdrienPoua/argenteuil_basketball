import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import MatchService from '@/services/Match';
import { errorHandler } from '@/lib/utils/handleApiError';
import { MatchSchema } from '@/lib/validation/Match';
import { z } from 'zod';

export async function GET() {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const matchs = await MatchService.getMatchs();
    return NextResponse.json(matchs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Check if the body is a valid match
    const body = await req.json();
    const matchsArray = Array.isArray(body) ? body : [body];

    // Validate entries
    const matchs = z.array(MatchSchema).parse(matchsArray);

    // Upsert matches
    const matchsCreated = await Promise.all(matchs.map(async (match) => MatchService.createMatch(match)));

    // log it
    console.log('Matchs created', matchsCreated);

    // Return 200
    return NextResponse.json({ message: 'Success', data: matchsCreated }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest) {
  // Check if the user is authenticated with the token in the cookie
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const matchsArray = Array.isArray(body) ? body : [body];

    // Validate entries
    const matchs = z.array(MatchSchema).parse(matchsArray);

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
