"use server";
import { ClubService } from "@/database/services/Club";
import { FormValues } from "../types/form.types";
import { revalidatePath } from "next/cache";

const clubService = new ClubService();

export async function createClub(data: FormValues) {
  console.log("🚀 ~ createClub ~ data:", data)
  await clubService.createClub(data);
  revalidatePath("/dashboard/correspondants");
}

export async function deleteClub(id: string) {
  await clubService.deleteClub(id);
  revalidatePath("/dashboard/correspondants");
}

export async function updateClub(data: FormValues & { id: string }) {
  await clubService.updateClub(data);
  revalidatePath("/dashboard/correspondants");
}
