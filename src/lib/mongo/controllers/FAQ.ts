"use server";
import connectDB from "@/lib/mongo/mongodb";
import DBFAQ from "@/lib/mongo/models/FAQ";

export async function createFAQ(payload: { question: string; answer: string; rank: number }): Promise<void> {
  await connectDB();
  try {
    const FAQ = new DBFAQ(payload);
    await FAQ.save();
    console.log("FAQ créée avec succès:", FAQ);
  } catch (error) {
    console.error("Erreur lors de la création de la FAQ:", error);
    throw new Error("Erreur lors de la création de la FAQ");
  }
}

export async function getFAQ() {
  await connectDB();
  try {
    const FAQ = await DBFAQ.find().sort({ rank: "descending" }).lean();
    return JSON.parse(JSON.stringify(FAQ))
  } catch (error) {
    console.error("Erreur lors de la récupération des FAQ:", error);
    throw new Error("Erreur lors de la récupération des FAQ");
  }
}

export async function deleteFAQ(id: string): Promise<void> {
  await connectDB();
  try {
    await DBFAQ.findByIdAndDelete(id);
    console.log("FAQ supprimée avec succès:", id);
  } catch (error) {
    console.error("Erreur lors de la suppression de la FAQ:", error);
    throw new Error("Erreur lors de la suppression de la FAQ");
  }
}

export async function updateRank(payload: { id: string; rank: number }): Promise<void> {
  const { id, rank } = payload
  await connectDB();
  try {
    await DBFAQ.findByIdAndUpdate(id, { rank });
    console.log("FAQ mise à jour avec succès:", id, rank);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la FAQ:", error);
    throw new Error("Erreur lors de la mise à jour de la FAQ");
  }
}
