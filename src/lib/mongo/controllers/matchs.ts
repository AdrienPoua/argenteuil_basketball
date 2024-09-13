"use server";
import connectDB from "@/lib/mongo/mongodb";
import DBMatch from "@/lib/mongo/models/Match";
import { Match } from "@/utils/models";
import { TDatabase, TFBI } from "@/utils/types";
import Adapter from "@/utils/adapters/matchs/fromFBIForModel";

export async function createMatch(data: TFBI.Match): Promise<void> {
  await connectDB();
  const match = new Match(Adapter(data));
  const matchObject = match.toObject();

  console.log("🚀 ~ createMatch ~ match:", matchObject);
  try {
    await DBMatch.updateOne(
      { matchNumber: match.matchNumber },
      { ...matchObject },
      { upsert: true, new: true } // This option ensures that the match is created if it doesn't exist, or updated if it does
    );
    console.log("Match créé avec succès:", matchObject);
  } catch (error) {
    console.error("Erreur lors de la création du match:", error);
    throw new Error("Erreur lors de la création du match");
  }
}

export async function getMatchs(): Promise<TDatabase.Match[]> {
  await connectDB();
  try {
    const matchs = await DBMatch.find();
    const sortedMatchs = matchs.toSorted((a, b) => {
      return parseInt(a.matchNumber) - parseInt(b.matchNumber);
    });
    return JSON.parse(JSON.stringify(sortedMatchs));
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs:", error);
    throw new Error("Erreur lors de la récupération des matchs");
  }
}
