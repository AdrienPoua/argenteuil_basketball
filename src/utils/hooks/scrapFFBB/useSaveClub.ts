"use client";
import { createClub } from "@/lib/mongo/controllers/clubs";
import { TDatabase } from "@/utils/types";

const useSaveClub = () => {
  const saveClub = async (club: TDatabase.Club) => {
    try {
      await createClub(club);
      console.log("Club créé avec succès : ", club);
    } catch (error) {
      console.error("Erreur lors de la création du club:", error);
    }
  };

  return { saveClub };
};

export default useSaveClub;
