import { NextResponse, NextRequest } from 'next/server';
import FaqService from '@/services/FAQ';
import { FAQSchema } from '@/lib/validation/FAQ';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();
  try {
    const body = await req.json();
    const faq = FAQSchema.omit({ id: true }).parse(body);
    const updatedFaq = await FaqService.updateFaq({ ...faq, id: params.id });
    return NextResponse.json(updatedFaq);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Check if the user is authenticated
  await validateUser();
  try {
    const deletedFaq = await FaqService.deleteFaq(params.id);
    return NextResponse.json(deletedFaq);
  } catch (error) {
    return errorHandler(error);
  }
}
