"use server";

import { z } from "zod";
import rank from "@/database/models/rank";
import CRUD from "@/database/crud";

const rankCrud = new CRUD(rank);

const statsSchema = z.object({
  organisme: z.object({
    id: z.number(),
    libelle: z.string(),
    code: z.string().nullable(),
  }),
  matchJoues: z.number().nullable(),
  points: z.number().nullable(),
  position: z.number().nullable(),
  gagnes: z.number().nullable(),
  perdus: z.number().nullable(),
  paniersMarques: z.number().nullable().optional(),
  paniersEncaisses: z.number().nullable().optional(),
  difference: z.number().nullable().optional(),
});

const rankSchema = z.array(statsSchema);
const payloadSchema = z.array(rankSchema)

type TRank = z.infer<typeof payloadSchema>;

export async function updateRank(classement: unknown): Promise<TRank[] | void> {
  try {
    const parsedRanking = payloadSchema.parse(classement)
    rankCrud.drop();
    parsedRanking.forEach((compet) => compet.forEach((item) => rankCrud.create(item)));
  } catch (error) {
    console.error("Error parsing ranking:", error);
    throw error;
  }
}
