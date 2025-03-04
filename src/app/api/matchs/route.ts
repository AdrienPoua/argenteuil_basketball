import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import MatchService from '@/services/Match';
import { errorHandler } from '@/lib/utils/handleApiError';
import { MatchSchema } from '@/lib/validation/Match';
import { z } from 'zod';
import prisma from '@/database/prisma';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';

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

  // This is a Schema to create à match

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

    // Check if the data has the new format with matchs and competitions
    if (body.matchs && body.competitions) {
      const { matchs, competitions } = body;

      // Get clubs for opponent details
      const clubs = await prisma.club.findMany();

      // Process matchs similar to how it was done in server action
      const processedMatchs = matchs.map((match: any) => {
        const competition = competitions.find((comp: any) => comp.id === match.idPoule);
        const opponentId =
          match.idOrganismeEquipe1 === argenteuilIdOrganisme
            ? match.idOrganismeEquipe2.toString()
            : match.idOrganismeEquipe1.toString();
        const opponentClub = clubs.find((club) => club.id === opponentId);

        return {
          ...match,
          id: match.id.toString(),
          competition: competition?.label ?? null,
          correspondant: opponentClub?.email ?? null,
          salle: match.salle?.libelle ?? 'Salle inconnue',
        };
      });

      const parsedMatchs = z.array(MatchSchema).parse(processedMatchs);

      // Validate and upsert matches
      const matchsUpserted = await Promise.all(
        parsedMatchs.map(async (match) => {
          return await MatchService.upsert(match);
        }),
      );

      // Return the result
      return NextResponse.json({ message: 'Success', data: matchsUpserted }, { status: 200 });
    }

    // Handle the legacy format (for backward compatibility)
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
  } catch (error) {
    return errorHandler(error);
  }
}
