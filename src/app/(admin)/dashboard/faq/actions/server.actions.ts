"use server";

import { z } from "zod";
import { FAQService } from "@/database/services/FAQ";
import { formSchema } from "../schemas/form.schema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const faqService = new FAQService();

export async function createFAQ(data: z.infer<typeof formSchema>) {
  await faqService.createFaq(data);
  revalidatePath("/dashboard/faq");
}

export async function pushRank(faq: Prisma.FAQGetPayload<{}>) {
  await faqService.pushRank(faq);
  revalidatePath("/dashboard/faq");
}

export async function deleteFAQ(id: string) {
  await faqService.deleteFaq(id);
  revalidatePath("/dashboard/faq");
}

export async function downRank(faq: Prisma.FAQGetPayload<{}>) {
  await faqService.downRank(faq);
  revalidatePath("/dashboard/faq");
}
