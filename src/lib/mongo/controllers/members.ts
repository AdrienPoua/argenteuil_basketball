"use server";
import connectDB from "@/lib/mongo/mongodb";
import DBMember from "@/lib/mongo/models/Member";
import { Member } from "@/utils/models";
import { TDatabase } from "@/utils/types";

export async function createMember(data: TDatabase.Member): Promise<void> {
  await connectDB();
  const member = new Member(data);
  member.setYear();
  const memberObject = member.toObject();
  const findMatchInDatabase = await DBMember.findOne({ name: memberObject.name, firstName: memberObject.firstName, year: memberObject.year });
  if (findMatchInDatabase) {
    console.log("Un membre identique est déjà dans la database", memberObject);
    return;
  }
  const DBmember = new DBMember(memberObject);
  try {
    await DBmember.save();
    console.log("Membre créé avec succès:", DBmember);
  } catch (error) {
    console.error("Erreur lors de la création du membre:", error);
    throw new Error("Erreur lors de la création du membre");
  }
}

export async function getMembers(): Promise<TDatabase.Member[]> {
  await connectDB();
  try {
    const members = await DBMember.find().lean();
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    throw new Error("Erreur lors de la récupération des membres");
  }
}
