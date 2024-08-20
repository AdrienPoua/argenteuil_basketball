"use client";

import { dropCollection } from "@/lib/mongo/controllers/clubs";
import { useState } from "react";
import { useQueryClient } from "react-query";
import useLinks from "./useLinks";
import useGetData from "./useGetData";
import useSaveClub from "./useSaveClub";

export default function useUpdate() {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const { links } = useLinks();
  const { getData } = useGetData();
  const { saveClub } = useSaveClub();

  const update = async (): Promise<void> => {
    try {
      const data = await getData();
      await dropCollection();
      await Promise.all(
        data.map(async (club) => {
          await saveClub(club);
        })
      );
      queryClient.invalidateQueries("clubs");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des clubs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, links };
}
