"use client";

import { useState, useEffect } from "react";
import { getLinks } from "@/lib/puppeteer/cd";

export default function useLinks() {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchLinks = async (): Promise<void> => {
      try {
        const links = await getLinks();
        setLinks(links);
      } catch (error) {
        console.error("Erreur lors de la récupération des liens:", error);
      }
    };
    fetchLinks();
  }, []);

  return { links };
}
