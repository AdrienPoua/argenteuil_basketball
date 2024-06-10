import leadershipData from "@/data/leadership.json";
import teamsData from "@/data/teams.json";
import newsData from "@/data/news.json";
import gymsData from "@/data/gyms.json";
import { Leadership, News, Team, Gym } from "@/models";
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








// validate(leadership).then((errors: ValidationError[]) => {
//     if (errors.length > 0) {
//         console.log("Validation failed. Errors: ", errors);
//     } else {
//         console.log("Validation succeed");
//     }
//     });


// validate(teams).then((errors: ValidationError[]) => {
//     if (errors.length > 0) {
//         console.log("Validation failed. Errors: ", errors);
//     } else {
//         console.log("Validation succeed");
//     }
//     });


    


