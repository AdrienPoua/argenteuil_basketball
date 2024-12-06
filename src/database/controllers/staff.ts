"use server";

import Staff from "@/database/models/Staff";
import CRUD from "@/database/crud";
import { TDatabase } from "@/types";
import { z } from "zod";

// Schéma de validation Zod
const staffSchema = z.object({
  number: z.string(),
  name: z.string(),
  email: z.string(),
  teams: z.array(z.string()).optional(),
  isEmailDisplayed: z.boolean().optional(),
  isNumberDisplayed: z.boolean().optional(),
  job: z.string().optional(),
  image: z.string().optional(),
});

type TStaff = z.infer<typeof staffSchema>;

// Instance CRUD pour Staff
const staffCrud = new CRUD(Staff);

// Création d'un staff
export async function createStaff(staff: TStaff) {
  const parsedStaff = staffSchema.parse(staff);
  return await staffCrud.create(parsedStaff);
}

// Mise à jour d'un staff
export async function updateStaff(id: string, staff: TStaff) {
  const parsedStaff = staffSchema.parse(staff);
  return await staffCrud.update({ _id: id }, parsedStaff);
}

// Récupérer les leaders
export async function getLeaders(): Promise<
  (TDatabase.Leader & { id: string })[]
> {
  return await staffCrud.read({ job: { $ne: "" } });
}

// Récupérer les coachs
export async function getCoachs(): Promise<TDatabase.Coach[]> {
  return await staffCrud.read({ teams: { $exists: true, $not: { $size: 0 } } });
}

// Récupérer tout le staff
export async function getStaff(): Promise<TDatabase.Staff[]> {
  return await staffCrud.read();
}

// Suppression d'un staff
export async function deleteStaff(id: string): Promise<void> {
  return await staffCrud.remove({ _id: id });
}
