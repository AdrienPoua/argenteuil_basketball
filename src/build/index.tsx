import leadershipData from "@/data/leadership.json";
import teamsData from "@/data/teams.json";
import newsData from "@/data/news.json";
import gymsData from "@/data/gyms.json";
import  DocumentsData  from "@/data/documents.json";
import { Leadership, News, Team, Gym, Document } from "@/models";
import { validate, ValidationError } from "class-validator";


export const leadership: Leadership[] = leadershipData.map((leader) => new Leadership(leader));
export const teams : Team[] = teamsData.map((team) => {
    const coach = leadershipData.find((leader) => leader.teams?.includes(team.name));
    const teamX = new Team(team)
    if (coach) {
        teamX.coach = coach.name;
    }
    return teamX;
});

export const gyms: Gym[] = gymsData.map((gymnase) => {
    const gym = new Gym(gymnase);
    gym.slots = teams;
    return gym;
  });

export const news : News[] = newsData.map((news) => new News(news));

export const documents : Document[] =  DocumentsData.map((document) => new Document(document)); 


async function validateData(data: any[], className: string) {
    for (const item of data) {
      const errors = await validate(item);
      if (errors.length > 0) {
        console.error(`Validation failed for ${className}. Errors: `, errors);
      } else {
        console.log(`Validation succeed for ${className}`);
      }
    }
  }
  
  validateData(leadership, 'Leadership');
  validateData(teams, 'Team');
  validateData(gyms, 'Gym');
  validateData(news, 'News');
  validateData(documents, 'Document');
