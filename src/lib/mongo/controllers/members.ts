import connectDB from "@/lib/mongo/mongodb";
import DBMember from "@/lib/mongo/models/Member";
import { Member } from "@/models";
import { MemberType } from "@/types";

export async function createMember(data: MemberType): Promise<void> {
  await connectDB();
  const member = new Member(data);
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
