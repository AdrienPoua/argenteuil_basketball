import staffData from "@/data/staff.json";
import teamsData from "@/data/teams.json";
import gymsData from "@/data/gyms.json";
import documentsData from "@/data/documents.json";
import FAQdata from "@/data/faq.json";
import clubData from "@/data/club.json";
import permanencesData from "@/data/permanences.json";
import { Team, Gym, Document, FAQ, Club, Permanences, Leader, Coach } from "@/utils/models";
import { ZodSchema, ZodError } from 'zod';
import { GymSchema, PermanencesSchema, TeamSchema, DocumentSchema, ClubSchema, FAQSchema, LeaderSchema, CoachSchema } from "@/lib/zod";
import { LeaderPropsType, CoachPropsType } from "@/utils/types";

// This is a data processing file that imports data from JSON files and processes it into instances of classes defined in the models folder.
// The data is then exported to be used in the application.
// It also add setters and getters to the data, and validates the data using zod.

export const ValidateWithZod = <T,>(objectToCheck: T | T[], schema: ZodSchema<T>) => {
  try {
    if (Array.isArray(objectToCheck)) {
      objectToCheck.forEach((object) => {
        schema.parse(object);
      });
    } else {
      schema.parse(objectToCheck);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("🚀 ~ ValidateWithZod ~ objectToCheck:", objectToCheck)
      throw new Error(`${JSON.stringify(error.errors)}`);
    } else {
      throw new Error('Unknown error');
    }
  }
};

function checkAllData() {
  ValidateWithZod(teamsData, TeamSchema);
  ValidateWithZod(gymsData, GymSchema);
  ValidateWithZod(documentsData, DocumentSchema)
  ValidateWithZod(FAQdata, FAQSchema)
  ValidateWithZod(clubData, ClubSchema)
  ValidateWithZod(permanencesData, PermanencesSchema)
  ValidateWithZod(leaders, LeaderSchema)
  ValidateWithZod(coachs, CoachSchema)
}

// Export the data to be used in the application

export const leaders: Leader[] = staffData.leaders.map((leader: LeaderPropsType) => new Leader(leader));
export const coachs: Coach[] = staffData.coachs.map((coach: CoachPropsType) => new Coach(coach));
export const documents: Document[] = documentsData.map((documentItem) => new Document(documentItem));
export const faq: FAQ[] = FAQdata.map((faqItem) => new FAQ(faqItem));
export const club: Club = new Club(clubData);
export const permanence: Permanences = new Permanences(permanencesData);
export const teams: Team[] = teamsData.map((team) => {
  const coach = coachs.find((coach) => coach.teams?.includes(team.name));
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


checkAllData();
