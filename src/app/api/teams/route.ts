import { NextRequest, NextResponse } from 'next/server';
import TeamService from '@/services/Team';
import { TeamSchema } from '@/lib/validation/Team';
import { errorHandler } from '@/lib/utils/handleApiError';
import { z } from 'zod';
import { validateUser } from '@/lib/api/validateUser';

export async function GET() {
  // Check if the user is authenticated
  await validateUser();

  try {
    const teams = await TeamService.getTeams();
    return NextResponse.json(teams);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  await validateUser();

  try {
    const body = await req.json();
    const teams = TeamSchema.omit({ id: true, coach: true }).extend({ coach: z.string().optional() }).parse(body);
    const teamsCreated = await TeamService.createTeam(teams);

    console.log('Teams created', teamsCreated);
    return NextResponse.json({ message: 'Success', data: teamsCreated }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
