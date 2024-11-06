"use server";
import { TDatabase } from "@/utils/types";
import { create, remove } from "@/lib/mongo/utils";
import { ValidateWithZod } from "@/lib/zod/utils";
import { SDatabase } from "@/lib/zod/schemas";
import connectDB from "@/lib/mongo/mongodb";
import Team from "@/lib/mongo/models/Team";

export async function createTeam(payload: TDatabase.Team) {
  ValidateWithZod(payload, SDatabase.Team);
  return await create({ payload, model: Team });
}

export async function getTeams(): Promise<(TDatabase.Team & { _id: string })[]> {
  await connectDB();
  try {
    const team = await Team.find().lean();
    return JSON.parse(JSON.stringify(team));
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    return [];
  }
}

export async function updateTeam(id: string, payload: TDatabase.Team) {
  try {
    ValidateWithZod(payload, SDatabase.Team);
    await Team.findOneAndUpdate({ _id: id }, payload, { new: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'équipe:", error);
  }
}

export async function DeleteTeam(id: string) {
  await remove({ filter: { _id: id }, model: Team });
}