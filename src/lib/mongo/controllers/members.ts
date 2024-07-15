"use server";
import connectDB from "@/lib/mongo/mongodb";
import DBMember, { DBMemberType } from "@/lib/mongo/models/Member";
import { Member } from "@/models";
import { MemberType } from "@/types";

export async function createMember(data: MemberType): Promise<void> {
  await connectDB();
  const member = new Member(data);
  member.setYear();
  const memberObject = member.toObject();
  const findMatchInDatabase = await DBMember.findOne({ name: memberObject.name, firstName: memberObject.firstName, year: memberObject.year });
  if (findMatchInDatabase) {
    return;
  }
  const DBmember = new DBMember(memberObject);
  try {
    await DBmember.save();
    console.log("Membre créé avec succès:", DBmember);
  } catch (error) {
    console.error("Erreur lors de la création du membre:", error);
  }
}

export async function getMembers(): Promise<DBMemberType[]> {
  await connectDB();
  try {
    const members = await DBMember.find();
    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    return [];
  }
}