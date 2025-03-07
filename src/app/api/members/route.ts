import { NextRequest, NextResponse } from 'next/server'
import MemberService from '@/services/Member';
import { MemberSchema } from '@/lib/validation/Member';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';

export async function GET() {
  // Check if the user is authenticated
  await validateUser();

  try {
    const members = await MemberService.getMembers();
    return NextResponse.json(members);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  await validateUser();

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
