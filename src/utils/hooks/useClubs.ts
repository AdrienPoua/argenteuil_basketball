import { useQueryClient } from "react-query";
import { createClub, updateClub, deleteClub } from "@/lib/mongo/controllers/clubs";

export default function useClubs(payload: { club: string; correspondant: string; id: string }) {
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

  const add = async (): Promise<void> => {
    const action = () => createClub({ club: payload.club, correspondant: payload.correspondant });
    await handleRequest(action, "Erreur lors de la création du club:");
  };

  const update = async (): Promise<void> => {
    const action = () => updateClub({ club: payload.club, correspondant: payload.correspondant, id: payload.id });
    await handleRequest(action, "Erreur lors de la mise à jour du club:");
  };

  const erase = async (): Promise<void> => {
    const action = () => deleteClub(payload.id);
    await handleRequest(action, "Erreur lors de la suppression du club:");
  };

  return { add, update, erase };
}
