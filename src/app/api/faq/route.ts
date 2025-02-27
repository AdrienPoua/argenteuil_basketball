import { FAQSchema } from '@/lib/validation/FAQ';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/integrations/nextAuth/auth';
import FAQService from '@/services/FAQ';
import { errorHandler } from '@/lib/utils/handleApiError';

export async function GET() {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const faqs = await FAQService.getFaqs();
    return NextResponse.json(faqs);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
