"use server";
import { ClubService } from "@/database/services/Club";
import { FormValues } from "../types/form.types";
import { revalidatePath } from "next/cache";

const clubService = new ClubService();

export async function deleteClub(id: string) {
  await clubService.deleteClub(id);
  revalidatePath("/dashboard/correspondants");
}

export async function updateClub(data: FormValues) {
  await clubService.updateClub(data);
  revalidatePath("/dashboard/correspondants");
}
