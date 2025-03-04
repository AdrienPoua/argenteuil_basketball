import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import FaqService from '@/services/FAQ';
import { FAQSchema } from '@/lib/validation/FAQ';
import { errorHandler } from '@/lib/utils/handleApiError';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const faq = FAQSchema.omit({ id: true }).parse(body);
    console.log('🚀 ~ PUT ~ faq:', faq);
    const updatedFaq = await FaqService.updateFaq({ ...faq, id: params.id });
    return NextResponse.json(updatedFaq);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const deletedFaq = await FaqService.deleteFaq(params.id);
    return NextResponse.json(deletedFaq);
  } catch (error) {
    return errorHandler(error);
  }
}
