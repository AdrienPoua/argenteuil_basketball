'use server';

import { z } from 'zod';
import FAQService from '@/services/FAQ';
import { formSchema } from '../schemas/form.schema';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import mongoose, { Schema } from 'mongoose';

export async function createFAQ(data: z.infer<typeof formSchema>) {
  await FAQService.createFaq(data);
  revalidatePath('/dashboard/faq');
}

export async function pushRank(faq: Prisma.FAQGetPayload<{}>) {
  await FAQService.pushRank(faq);
  revalidatePath('/dashboard/faq');
}

export async function deleteFAQ(id: string) {
  await FAQService.deleteFaq(id);
  revalidatePath('/dashboard/faq');
}

export async function downRank(faq: Prisma.FAQGetPayload<{}>) {
  await FAQService.downRank(faq);
  revalidatePath('/dashboard/faq');
}

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  rank: { type: Number, required: true },
});

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
