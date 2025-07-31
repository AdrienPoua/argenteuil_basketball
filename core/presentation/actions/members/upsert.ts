'use server';

import { revalidatePath } from 'next/cache';
import { UpsertMemberUseCase } from '@/core/application/usecases/Member/UpsertMemberUseCase';
import { createClient } from '@/core/infrastructure/supabase/clients/server';
import { SupabaseMemberRepository } from '@/core/infrastructure/supabase/repositories/member.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function upsert(data: {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  role: string[];
  contact_privacy: {
    showEmail: boolean;
    showPhone: boolean;
  };
  image?: string;
}) {
  try {
    const client = await createClient();
    const repository = new SupabaseMemberRepository(client);
    const upsertUseCase = new UpsertMemberUseCase(repository);
    const entity = await upsertUseCase.execute(data);

    revalidatePath('/');
    revalidatePath('/club/dirigeants');
    revalidatePath('/club/entraineurs');

    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
