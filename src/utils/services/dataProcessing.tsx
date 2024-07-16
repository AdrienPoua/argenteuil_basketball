import leadershipData from "@/data/leadership.json";
import teamsData from "@/data/teams.json";
import gymsData from "@/data/gyms.json";
import documentsData from "@/data/documents.json";
import FAQdata from "@/data/faq.json";
import clubData from "@/data/club.json";
import permanencesData from "@/data/permanences.json";
import { Leadership, Team, Gym, Document, FAQ, Club, Permanences } from "@/utils/models";


// This is a data processing file that imports data from JSON files and processes it into instances of classes defined in the models folder.
// The data is then exported to be used in the application.
// It also add setters and getters to the data, and validates the data using zod.

export const leadership: Leadership[] = leadershipData.map((leader) => new Leadership(leader));

export const teams: Team[] = teamsData.map((team) => {
  const coach = leadershipData.find((leader) => leader.teams?.includes(team.name));
  const teamInstance = new Team(team);
  if (coach) {
    teamInstance.coach = coach.name;
  }
  return teamInstance;
});

export const gyms: Gym[] = gymsData.map((gymData) => {
  const gymInstance = new Gym(gymData);
  gymInstance.slots = teams;
  return gymInstance;
});

export const documents: Document[] = documentsData.map((documentItem) => new Document(documentItem));
export const faq: FAQ[] = FAQdata.map((faqItem) => new FAQ(faqItem));
export const club: Club = new Club(clubData);
export const permanence: Permanences = new Permanences(permanencesData);



