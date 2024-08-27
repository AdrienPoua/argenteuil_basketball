"use client";
import { useQueryClient } from "react-query";
import { deleteFAQ, updateRank, createFAQ } from "@/lib/mongo/controllers/FAQ";


export function useFAQ() {
  const queryClient = useQueryClient();

  const handleAction = async (action: () => Promise<void>, actionName: string) => {
    try {
      await action();
      queryClient.invalidateQueries("faq");
    } catch (error) {
      console.error(`Erreur lors de ${actionName} de la FAQ:`, error);
      throw new Error(`Erreur lors de ${actionName} de la FAQ`);
    }
  };

  const erase = async (id: string) => {
    await handleAction(() => deleteFAQ(id), "la suppression");
  };

  const create = async (payload: { question: string; answer: string; rank: number }) => {
    await handleAction(() => createFAQ(payload), "la création");
  };

  const update = async (payload: { id: string; rank: number }) => {
    if (!payload.id) {
      throw new Error("L'ID est requis pour mettre à jour la FAQ");
    }
    await handleAction(() => updateRank(payload), "la mise à jour");
  };

  return { erase, create, update };
}