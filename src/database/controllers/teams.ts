"use server";

import Team from "@/database/models/Team";
import CRUD from "@/database/crud";
import { z } from "zod";

// Instance CRUD pour le modèle Team
const teamCrud = new CRUD(Team);

const trainingSchema = z.object({
  end: z.string(),
  day: z.enum(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]),
  start: z.string(),
  gym: z.enum(["Jean Guimier", "Jesse Owens"]),
});

const TeamSchema = z.object({
  name: z.string(),
  training: z.array(trainingSchema),
  image: z.string().optional(),
  coach: z.string().optional(),
  division: z.string().optional(),
});

type TTeam = z.infer<typeof TeamSchema>;
// Création d'une équipe
export async function createTeam(team: unknown): Promise<TTeam> {
  const parsedTeam = TeamSchema.parse(team);
  return await teamCrud.create(parsedTeam);
}

// Récupération de toutes les équipes
export async function getTeams() {
  return await teamCrud.read();
}

// Mise à jour d'une équipe
export async function updateTeam(id: string, team: TTeam): Promise<TTeam> {
  const parsedTeam = TeamSchema.parse(team);
  return await teamCrud.update({ _id: id }, parsedTeam);
}

// Suppression d'une équipe
export async function deleteTeam(id: string) {
  return await teamCrud.remove({ _id: id });
}
