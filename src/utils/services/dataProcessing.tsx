import gymsData from "@/data/gyms.json";
import documentsData from "@/data/documents.json";
import FAQdata from "@/data/faq.json";
import clubData from "@/data/club.json";
import permanencesData from "@/data/permanences.json";
import { Gym, Document, FAQ, Permanences } from "@/utils/models";




// This is a data processing file that imports data from JSON files and processes it into instances of classes defined in the models folder.
// The data is then exported to be used in the application.
// It also add setters and getters to the data, and validates the data using zod.

export const documents = documentsData.map((documentItem) => new Document(documentItem));
export const faq = FAQdata.map((faqItem) => new FAQ(faqItem));
export const ABB = clubData
export const permanence = new Permanences(permanencesData);

export const gyms: Gym[] = gymsData.map((gymData) => {
  const gymInstance = new Gym(gymData);
  return gymInstance;
});


