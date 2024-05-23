// PlanningPage.tsx
"use client";
import CardLayout from "@/components/layouts/main";
import teamsData from "@/data/teams.json";
import { Gym, Team } from "@/models";
import club from "@/data/club.json";
import { PlanbyConfigType, PlanbyChannelType, TeamType } from "@/types";
import Planning from "@/components/planby/Planning";
import { Theme } from "planby";
import { theme } from "@/components/planby/theme";

const initializeData = () => {
  const gymnases = club.gymnases.map((gym) => new Gym(gym));
  const teams: TeamType[] = teamsData.map((team) => new Team(team));
  const slotsByGym = gymnases.map((gym) => gym.planning(teams));
  return slotsByGym;
};

export default function Page() {
  const slotsByGym = initializeData();
  const channelsBuild = (days: string[]): PlanbyChannelType[] => {
    return days.map((day) => ({
      logo: `https://via.placeholder.com/150?text=${day}`,
      uuid: day,
      name: day,
      test: "ok",
    }));
  };

  const config: PlanbyConfigType = {
    startDate: "2000-01-01T17:00:00",
    endDate: "2000-01-01T22:00:00",
    dayWidth: 1100,
    isTimeline: false,
  };

  const config2: PlanbyConfigType = {
    startDate: "2000-01-01T10:00:00",
    endDate: "2000-01-01T15:00:00",
    dayWidth: 1000,
    isTimeline: false,
  };
  console.log(theme);
  return (
    <CardLayout pageTitle='Jean Guimier'>
      <div className='flex flex-col grow max-w-7xl mb-10 overflow-hidden'>
        <Planning slots={slotsByGym[0]} config={config} channels={channelsBuild(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"])} />
        <Planning slots={slotsByGym[0]} config={config2} channels={channelsBuild(["Samedi"])} />
        <h2 className='text-white text-5xl text-center my-10'>{slotsByGym[1][0].gym}</h2>
        <Planning slots={slotsByGym[1]} config={config} channels={channelsBuild(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"])} />
      </div>
    </CardLayout>
  );
}
