'use server';
import ClubService from '@/services/Club';
import { FormValues } from '../types/form.types';
import { revalidatePath } from 'next/cache';

export async function deleteClub(id: string) {
  await ClubService.deleteClub(id);
  revalidatePath('/dashboard/correspondants');
}

export async function updateClub(data: FormValues) {
  await ClubService.updateClub(data);
  revalidatePath('/dashboard/correspondants');
}
