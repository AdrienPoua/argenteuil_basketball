"use server";
import { TeamService } from "@/database/services/Team";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { formSchema } from "../components/Form";

const teamService = new TeamService();

const createTeamSchema = formSchema.extend({
  image: z.string().optional()
})

export const createTeam = async (data: z.infer<typeof createTeamSchema>) => {
  await teamService.createTeam(data);
  revalidatePath("/dashboard/equipes");
};

export const deleteTeam = async (id: string) => {
  await teamService.deleteTeam(id);
  revalidatePath("/dashboard/equipes");
};
