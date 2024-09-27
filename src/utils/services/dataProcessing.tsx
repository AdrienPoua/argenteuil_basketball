import staffData from "@/data/staff.json";
import teamsData from "@/data/teams.json";
import gymsData from "@/data/gyms.json";
import documentsData from "@/data/documents.json";
import FAQdata from "@/data/faq.json";
import clubData from "@/data/club.json";
import permanencesData from "@/data/permanences.json";
import { Gym, Document, FAQ, Permanences, Leader, Coach } from "@/utils/models";
import { TeamFactory } from "../models/Team";




// This is a data processing file that imports data from JSON files and processes it into instances of classes defined in the models folder.
// The data is then exported to be used in the application.
// It also add setters and getters to the data, and validates the data using zod.

export const leaders = staffData.leaders.map((leader) => new Leader(leader));
export const coachs = staffData.coachs.map((coach) => new Coach(coach));
export const documents = documentsData.map((documentItem) => new Document(documentItem));
export const faq = FAQdata.map((faqItem) => new FAQ(faqItem));
export const ABB = clubData
export const permanence = new Permanences(permanencesData);

export const teams = teamsData.map((team) => {
  const coach = coachs.find((coach) => coach.teams?.includes(team.name));
  const teamInstance = TeamFactory.createTeam(team);
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


