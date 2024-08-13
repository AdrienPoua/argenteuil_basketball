"use server";
import connectDB from "@/lib/mongo/mongodb";
import Club from "@/lib/mongo/models/Clubs";

const formatData = ({ club, correspondant }: { club: string; correspondant: string }) => {
  return { club: club.trim().toLowerCase(), correspondant: correspondant.trim().toLowerCase() };
};

export async function createClub({ club, correspondant }: { club: string; correspondant: string }): Promise<void> {
  await connectDB();
  const findMatchInDatabase = await Club.findOne({ club });
  if (findMatchInDatabase) {
    console.log("Un club identique est déjà dans la database", club);
    return;
  }
  const formatedData = formatData({ club, correspondant });
  const newClub = new Club(formatedData);
  try {
    await newClub.save();
    console.log("Club créé avec succès:", newClub);
  } catch (error) {
    console.error("Erreur lors de la création du club:", error);
  }
}

export async function updateClub({ club, correspondant, id }: { club: string; correspondant: string; id: string }): Promise<void> {
  await connectDB();
  try {
    await Club.findByIdAndUpdate(id, formatData({ club, correspondant }));
    console.log("Club mis à jour avec succès:", club);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du club:", error);
  }
}

export async function getClubs(): Promise<{ club: string; correspondant: string; _id: string }[]> {
  await connectDB();
  try {
    const clubs = await Club.find();
    return JSON.parse(JSON.stringify(clubs));
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
    return [];
  }
}

export async function deleteClub(id: string): Promise<void> {
  await connectDB();
  try {
    await Club.findByIdAndDelete(id);
    console.log("Club supprimé avec succès:", id);
  } catch (error) {
    console.error("Erreur lors de la suppression du club:", error);
  }
}
