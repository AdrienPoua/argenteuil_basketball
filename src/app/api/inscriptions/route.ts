import InscriptionService from '@/services/Inscriptions';
import { NextResponse } from 'next/server';
import { InscriptionSchema } from '@/lib/validation/Inscription';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';

export async function POST(request: Request) {
  try {
    await validateUser();
    const body = await request.json();
    const validatedData = InscriptionSchema.parse(body);
    const inscription = await InscriptionService.create(validatedData);
    return NextResponse.json(inscription, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    await validateUser();
    const inscriptions = await InscriptionService.getAll();
    return NextResponse.json(inscriptions, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
