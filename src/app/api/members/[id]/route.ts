import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import MemberService from '@/services/Member';
import { errorHandler } from '@/lib/utils/handleApiError';
import { Prisma } from '@prisma/client';
import { MemberSchema } from '@/lib/validation/Member';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const member = MemberSchema.parse(body);
    // update match
    const memberUpdate = await MemberService.updateMember({ ...member, id: params.id });
    console.log('Member updated', memberUpdate);

    // Return 200
    return NextResponse.json({ message: 'Success', data: memberUpdate }, { status: 200 });
  } catch (error) {
    // If the error is a Prisma error and the code is P2025 (record not found), return a 404 error (not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    return errorHandler(error); // Gère les autres erreurs normalement
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const deletedMember = await MemberService.deleteMember(params.id);
    console.log('Member deleted', deletedMember);
    return NextResponse.json({ message: 'Member deleted', data: deletedMember }, { status: 200 });
  } catch (error) {
    // If the error is a Prisma error and the code is P2025 (record not found), return a 404 error (not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    return errorHandler(error); // Gère les autres erreurs normalement
  }
}
