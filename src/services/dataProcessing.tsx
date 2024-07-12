import leadershipData from "@/data/leadership.json";
import teamsData from "@/data/teams.json";
import newsData from "@/data/news.json";
import gymsData from "@/data/gyms.json";
import documentsData from "@/data/documents.json";
import FAQdata from "@/data/faq.json";
import clubData from "@/data/club.json";
import ratesData from "@/data/rates.json";
import permanencesData from "@/data/permanences.json";
import membersData2023 from "@/data/members2023.json";
import membersData2024 from "@/data/members2024.json";
import { Leadership, News, Team, Gym, Document, FAQ, Club, Rate, Permanences, Member } from "@/models";
import { validate } from "class-validator";

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

export const news: News[] = newsData.map((newsItem) => new News(newsItem));
export const documents: Document[] = documentsData.map((documentItem) => new Document(documentItem));
export const faq: FAQ[] = FAQdata.map((faqItem) => new FAQ(faqItem));
export const club: Club = new Club(clubData);
export const rates: Rate[] = ratesData.map((rate) => new Rate(rate));
export const permanence: Permanences = new Permanences(permanencesData);
export const members2023: Member[] = membersData2023.map((member) => new Member(member));
export const members2024: Member[] = membersData2024.map((member) => new Member(member));
members2023.forEach((member) => (member.year = "2023"));
members2024.forEach((member) => (member.year = "2024"));
export const members: Member[] = [...members2023, ...members2024];
members.forEach((member, index) => member.id = index.toString()) ;


async function validateData(items: any[], className: string) {
  for (const item of items) {
    const errors = await validate(item);
    if (errors.length > 0) {
      console.error(`Validation failed for ${className}. Errors: `, errors);
    } else {
      console.log(`Validation succeeded for ${className}`);
    }
  }
}

export async function validateAllData() {
  await validateData(leadership, "Leadership");
  await validateData(teams, "Team");
  await validateData(gyms, "Gym");
  await validateData(news, "News");
  await validateData(documents, "Document");
  await validateData(faq, "FAQ");
  await validateData([club], "Club");
  await validateData(rates, "Rate");
  await validateData([permanence], "Permanences");
}
