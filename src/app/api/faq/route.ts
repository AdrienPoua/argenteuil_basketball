import { FAQSchema } from '@/lib/validation/FAQ';
import { NextRequest, NextResponse } from 'next/server';
import FAQService from '@/services/FAQ';
import { errorHandler } from '@/lib/utils/handleApiError';
import { validateUser } from '@/lib/api/validateUser';

export async function GET() {
  // Check if the user is authenticated
  await validateUser();

  try {
    const faqs = await FAQService.getFaqs();
    return NextResponse.json(faqs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  await validateUser();

  try {
    const body = await req.json();
    const faq = FAQSchema.omit({ id: true }).parse(body);

    const faqsCreated = await FAQService.createFaq(faq);

    console.log('Faq created', faqsCreated);
    return NextResponse.json({ message: 'Success', data: faqsCreated }, { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}
