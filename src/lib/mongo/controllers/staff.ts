"use server";
import Staff from "@/lib/mongo/models/Staff";
import { TDatabase } from "@/utils/types";
import { create, read } from "@/lib/mongo/utils";
import { ValidateWithZod } from "@/lib/zod/utils";
import { SDatabase } from "@/lib/zod/schemas";

type CreateStaffType = {
  number: string;
  name: string;
  email: string;
  teams?: string[];
  isEmailDisplayed: boolean;
  isNumberDisplayed: boolean;
  job?: string;
  image?: string;
};

type LeaderType = TDatabase.Staff & {
  job: string;
};
type CoachType = TDatabase.Staff & {
  teams: string[];
};

export async function createStaff(payload: CreateStaffType) {
  ValidateWithZod(payload, SDatabase.Staff);
  return await create({ payload, model: Staff });
}

export async function getLeaders(): Promise<LeaderType[]> {
  return (await read({ model: Staff, filter: { job: { $ne: "" } } })) as Promise<LeaderType[]>;
}

export async function getCoachs(): Promise<CoachType[]> {
  return read({ model: Staff, filter: { teams: { $exists: true, $not: { $size: 0 } } } }) as Promise<CoachType[]>;
}
