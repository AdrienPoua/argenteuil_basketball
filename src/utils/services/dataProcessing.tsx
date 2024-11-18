import gymsData from "@/data/gyms.json";
import documentsData from "@/data/documents.json";
import clubData from "@/data/club.json";
import { Gym, Document } from "@/utils/models";
export const documents = documentsData.map((documentItem) => new Document(documentItem));
export const ABB = clubData

export const gyms: Gym[] = gymsData.map((gymData) => {
  const gymInstance = new Gym(gymData);
  return gymInstance;
});


