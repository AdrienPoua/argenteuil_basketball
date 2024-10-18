"use server";
import Club from "@/lib/mongo/models/Clubs";
import { TDatabase } from "@/utils/types";
import { remove, update, read, create } from "@/lib/mongo/utils";

const collection = "clubs";

export async function createClub(payload: TDatabase.Club): Promise<void> {
  create({ payload, model: Club });
}

export async function getClubs(): Promise<
  {
    name: string;
    correspondant: { name: string; email: string; number: string };
    _id: string;
  }[]
> {
  return await read({ model: Club });
}

export async function updateClub(payload: {
  name: string;
  _id: string;
  correspondant: { name: string; email: string; number: string };
}): Promise<void> {
  update({ filter: { _id: payload._id }, payload, model: Club });
}

export async function deleteClub(id: string) {
  remove({ filter: { _id: id }, model: Club });
}
