import leadershipData from "@/data/leadership.json";
import { Leadership } from "@/models";

import { validate, ValidationError } from "class-validator";

export const leadership: Leadership[] = leadershipData.map((leader) => new Leadership(leader));

validate(leadership).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
        console.log("Validation failed. Errors: ", errors);
    } else {
        console.log("Validation succeed");
    }
    });


    




// export const gyms: Gym[] = gymsData.map((gym) => new Gym(gym));
// export const teams: Team[] = teamsData.map((team) => new Team(team));
// export const news: News[] = newsData.map((news) => new News(news));

// import newsData from "@/data/news.json";
// import clubData from "@/data/club.json";
// import gymsData from "@/data/gyms.json";
// import teamsData from "@/data/teams.json";import {  Leadership, Gym, Team, News } from "@/models";
