"use client";
import { scrap } from "@/lib/puppeteer/cd";
import useLinks from "./useLinks";
import { TDatabase } from "@/utils/types";

export default function useGetData() {
  const { links } = useLinks();

  const getData = async (): Promise<TDatabase.Club[]> => {
    const data = await Promise.all(
      links.map(async (link) => {
        return await scrap(link);
      })
    );

    if (!data || data.length === 0) {
      console.error("Aucune donnée récupérée.");
      throw new Error("Aucune donnée récupérée.");
    }

    return data.filter((club) => club !== null) as TDatabase.Club[];
  };


  return { getData };
}
