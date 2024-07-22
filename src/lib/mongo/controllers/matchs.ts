"use server";
import connectDB from "@/lib/mongo/mongodb";
import DBMatch from "@/lib/mongo/models/Match";
import { Match } from "@/utils/models";
import { DBMatchType, MatchType } from "@/utils/types";

export async function createMatch(data: MatchType): Promise<void> {
  await connectDB();
  const match = new Match(data);
  const matchObject = match.toObject();
  const findMatchInDatabase = await DBMatch.findOne({ matchNumber: matchObject.matchNumber });

  // If the match is already in the database
  if (findMatchInDatabase) {
    // Check if the match data is identical to the existing one
    const isIdentical =
      findMatchInDatabase.division === matchObject.division &&
      findMatchInDatabase.teamA === matchObject.teamA &&
      findMatchInDatabase.teamB === matchObject.teamB &&
      findMatchInDatabase.date === matchObject.date &&
      findMatchInDatabase.time === matchObject.time &&
      findMatchInDatabase.gym === matchObject.gym;

    if (isIdentical) {
      console.log("Un match identique est déjà dans la database", matchObject);
      return;
    } else {
      // If there is a modification, update the match and set the update field to true
      await DBMatch.findOneAndUpdate(
        { matchNumber: matchObject.matchNumber },
        { ...matchObject, update: true },
        { new: true, useFindAndModify: false }
      );
      console.log("Match modifié avec succès:", matchObject);
      return;
    }
  }

  // If the match is not in the database, we create it
  const newDBMatch = new DBMatch(matchObject);
  try {
    await newDBMatch.save();
    console.log("Match créé avec succès:", newDBMatch);
  } catch (error) {
    console.error("Erreur lors de la création du match:", error);
  }
}


export async function getMatchs(): Promise<DBMatchType[]> {
  await connectDB();
  try {
    const matchs = await DBMatch.find();
    return JSON.parse(JSON.stringify(matchs));
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    return [];
  }
}
