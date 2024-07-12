"use server";

import connectDB from "@/lib/mongo/mongodb";
import DBMember from "@/lib/mongo/models/Member";
import MemberClass from "@/models/Member";
import { MemberType } from "@/types";

export async function createMember(member: MemberType): Promise<void> {
  await connectDB();
  const dataFilter = new MemberClass(member)
  const memberObject = dataFilter.toObject()
  const isUnique = await DBMember.findOne({name: memberObject.name, firstName: memberObject.firstName, year: memberObject.year});
  if (isUnique) {
    console.log("Membre déjà existant:", isUnique);
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
