"use server"
import Club from "@/database/models/Clubs";
import CRUD from "@/database/crud";
import { z } from "zod";

const correspondantSchema = z.object({
  number: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});

const clubSchema = z.object({
  name: z.string(),
  correspondant: correspondantSchema.optional(),
}); 
const stringSchema = z.string();

type TClub = z.infer<typeof clubSchema>;

const clubCrud = new CRUD(Club);


export async function createClub(club: unknown): Promise<void> {
  const parsedClub = clubSchema.parse(club);
  return await clubCrud.create(parsedClub);
}

export async function getClubs() {
  return await clubCrud.read();
}

export async function updateClub(club : { id: string, name: string, correspondant?: { number?: string, name?: string, email?: string } }): Promise<TClub> {
  return clubCrud.update({ _id : club.id }, club );
}

export async function deleteClub(id: string) {
  return clubCrud.remove({ _id: id });
}
