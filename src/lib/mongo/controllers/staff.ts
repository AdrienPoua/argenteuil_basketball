"use server";
import Staff from "@/lib/mongo/models/Staff";
import { TDatabase } from "@/utils/types";
import { create, read, remove } from "@/lib/mongo/utils";
import { ValidateWithZod } from "@/lib/zod/utils";

import { z } from "zod";

const PayloadSchema = z.object({
  number: z.string(),
  name: z.string(),
  email: z.string(),
  teams: z.array(z.string()).optional(),
  isEmailDisplayed: z.boolean().optional(),
  isNumberDisplayed: z.boolean().optional(),
  job: z.string().optional(),
  image: z.string().optional(),
});

type TPayload = z.infer<typeof PayloadSchema>;

export async function createStaff(payload: TPayload) {
  ValidateWithZod(payload, PayloadSchema);
  return await create({ payload, model: Staff });
}

export async function getLeaders(): Promise<
  (TDatabase.Leader & { id: string })[]
> {
  return await read({
    model: Staff,
    filter: { job: { $ne: "" } },
  });
}

export async function getCoachs(): Promise<TDatabase.Coach[]> {
  const result = await read({
    model: Staff,
    filter: { teams: { $exists: true, $not: { $size: 0 } } },
  });
  return result;
}

export async function getStaff(): Promise<TDatabase.Staff[]> {
  const result = await read({
    model: Staff,
  });
  return result;
}

export async function deleteStaff(id: string): Promise<void> {
  console.log("🚀 ~ deleteStaff ~ id:", id);
  await remove({
    filter: { _id: id },
    model: Staff,
  });
}
