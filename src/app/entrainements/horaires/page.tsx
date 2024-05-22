"use client";
import React, { useMemo } from "react";
import { useEpg, Epg, Layout } from "planby";
import CardLayout from "@/components/layouts/CardLayout";
import teamsData from "@/data/teams.json";
import { Gym, Team } from "@/models";
import club from "@/data/club.json";
import { GymType, trainingType } from "@/types";
import { v4 as uuidv4 } from "uuid";

const gymnases = club.gymnases.map((gym) => new Gym(gym));
const teams = teamsData.map((team) => new Team(team));
const slotsByGym = gymnases.map((gym) => gym.planning(teams));
const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const epgMaker = (data: trainingType[]) => {
  return data.map((training: trainingType) => {
    const start = `2000-01-01T${training.start}`;
    const end = `2000-01-01T${training.end}`;
    return {
      id: uuidv4(),
      since: start,
      till: end,
      image: "test",
      title: ` Entrainement ${training.team} `,
      channelUuid: training.day,
      description: training.gym,
    };
  });
};
type PlanningProps = { slots: trainingType[]; config: any };

function Planning({ slots, config }: Readonly<PlanningProps>) {
  const channels = useMemo(
    () =>
      daysOfWeek.map((day) => ({
        logo: `https://via.placeholder.com/150?text=${day}`,
        uuid: day,
        name: day,
      })),
    []
  );
  const epg = epgMaker(slots);
  console.log(epg);

  const { getEpgProps, getLayoutProps } = useEpg({
    epg,
    channels,
    ...config, // or 2022-02-02T00:00:00
  });

  return (
    <Epg {...getEpgProps()}>
      <Layout {...getLayoutProps()} />
    </Epg>
  );
}

export default function PlanningPage() {
  const config = {
    startDate: "2000-01-01T18:00:00",
    endDate: "2000-01-01T23:00:00",
    dayWidth: 1500,
  };

  console.log(slotsByGym)

  return (
    <CardLayout pageTitle='Planning'>
      <div className='flex flex-col mx-20 overflow-hidden'>
        <Planning slots={slotsByGym[0]} config={config} />
        <Planning slots={slotsByGym[1]} config={config} />
      </div>
    </CardLayout>
  );
}
