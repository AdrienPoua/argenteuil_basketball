"use server";
import connectDB from "@/lib/mongo/mongodb";
import mongoose from "mongoose";
import Club from "@/lib/mongo/models/Clubs";
import { TDatabase } from "@/utils/types";
import { SDatabase } from "@/lib/zod/schemas";
import { ValidateWithZod } from "@/lib/zod/utils";

const collection = "clubs";

export async function createClub(payload: TDatabase.Club): Promise<void> {
  await connectDB();
  ValidateWithZod(payload, SDatabase.Club);

  const club = new Club(payload);
  try {
    await club.save();
    console.log("Club créé avec succès:", club);
  } catch (error) {
    console.error("Erreur lors de la création du club:", error);
  }
}

export async function getClubs(): Promise<
  TDatabase.Club[] & { _id: string }[]
> {
  await connectDB();
  try {
    const clubs = await Club.find();
    return JSON.parse(JSON.stringify(clubs));
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    return [];
  }
}
export async function updateClub(payload: {
  name: string;
  _id: string;
  correspondant: { name: string; email: string; number: string };
}): Promise<void> {
  await connectDB();
  try {
    const updatedClub = await Club.findOneAndUpdate(
      { _id: payload._id },
      payload,
      {
        new: true,
      },
    );
    if (updatedClub) {
      console.log("Club mis à jour avec succès:", payload);
    } else {
      console.error("Club non trouvé:", payload);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du club:", error);
  }
}

export async function dropCollection(): Promise<void> {
  await connectDB();
  try {
    await mongoose.connection.db?.dropCollection(collection);
    console.log("Collection supprimée avec succès:", collection);
  } catch (error) {
    console.error("Erreur lors de la suppression du club:", error);
  }
}
