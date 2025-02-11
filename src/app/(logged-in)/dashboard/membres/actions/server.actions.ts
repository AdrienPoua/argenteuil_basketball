'use server';
import MemberService from '@/services/Member';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { FormSchema } from '../schemas/form.schemas';

const createMemberSchema = FormSchema.extend({
  image: z.string().optional(),
});

const updateMemberSchema = FormSchema.extend({
  id: z.string(),
  image: z.string().optional(),
});

export const createMember = async (data: z.infer<typeof createMemberSchema>) => {
  await MemberService.createMember(data);
  revalidatePath('/dashboard/membres');
};

export const updateMember = async (data: z.infer<typeof updateMemberSchema>) => {
  await MemberService.updateMember(data);
  revalidatePath('/dashboard/membres');
};

export const deleteMember = async (id: string) => {
  await MemberService.deleteMember(id);
  revalidatePath('/dashboard/membres');
};
