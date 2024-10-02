"use server";
import Staff from "@/lib/mongo/models/Staff";
import { TDatabase } from "@/utils/types";
import { create, read } from "@/lib/mongo/utils";
import { ValidateWithZod } from "@/lib/zod/utils";
import { SDatabase } from "@/lib/zod/schemas";

export async function createStaff(payload: TDatabase.Staff) {
  ValidateWithZod(payload, SDatabase.Staff);
  return await create({ payload, model: Staff });
}

export async function getLeaders(): Promise<TDatabase.Leader[]> {
  return (await read({
    model: Staff,
    filter: { job: { $ne: "" } },
  })) as Promise<TDatabase.Leader[]>;
}

export async function getCoachs(): Promise<TDatabase.Coach[]> {
  const result = await read({
    model: Staff,
    filter: { teams: { $exists: true, $not: { $size: 0 } } },
  });
  return result;
}
