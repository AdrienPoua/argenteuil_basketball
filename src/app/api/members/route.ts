import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import MemberService from '@/services/Member';
import { MemberSchema } from '@/lib/validation/Member';
import { errorHandler } from '@/lib/utils/handleApiError';

export async function GET() {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const members = await MemberService.getMembers();
    return NextResponse.json(members);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const members = MemberSchema.omit({ id: true }).parse(body);

    const membersCreated = await MemberService.createMember(members);

    console.log('Members created', membersCreated);
    return NextResponse.json({ message: 'Success', data: membersCreated }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
