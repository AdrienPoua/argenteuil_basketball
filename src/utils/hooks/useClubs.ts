import { useQueryClient } from "react-query";
import { createClub, dropCollection } from "@/lib/mongo/controllers/clubs";
import { TDatabase } from "@/utils/types";

export default function useClubs(payload: TDatabase.Club) {
  const queryClient = useQueryClient();

  const handleRequest = async (action: () => Promise<void>, successMessage: string) => {
    try {
      await action();
      queryClient.invalidateQueries(["clubs"]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const create = async (): Promise<void> => {
    const action = () => createClub(payload);
    await handleRequest(action, "Erreur lors de la création du club:");
  };

  const erase = async (): Promise<void> => {
    const action = () => dropCollection();
    await handleRequest(action, "Erreur lors de la suppression du club:");
  };

  return { create, erase };
}
