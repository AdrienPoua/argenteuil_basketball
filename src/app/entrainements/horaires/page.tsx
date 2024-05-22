"use client";
import React, { useMemo } from "react";
import { useEpg, Epg, Layout } from "planby";
import CardLayout from "@/components/layouts/CardLayout";
import teamsData from "@/data/teams.json";
import { Gym, Team } from "@/models";
import club from "@/data/club.json";
import { GymType, trainingType } from "@/types";

export default function PlanningPage() {
  const gymnases = useMemo(() => club.gymnases.map((gym) => new Gym(gym)), [club.gymnases]);
  const teams = useMemo(() => teamsData.map((team) => new Team(team)), [teamsData]);
  const TrainingsByGym = useMemo(() => gymnases.map((gym) => gym.planning(teams)), [gymnases, teams]);

  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const channels = useMemo(
    () =>
      daysOfWeek.map((day) => ({
        logo: `https://via.placeholder.com/150?text=${day}`,
        uuid: day,
        name: day,
      })),
    []
  );

  const epgMaker = (data: trainingType[]) => {
    return data.map((training: trainingType) => {
      return {
        id: training.team ?? "ok",
        since:  `2000-01-01T${training.start}:00`,
        till: `2000-01-01T${training.end}:00`,
        image: "test",
        title: training.team ?? "ok",
        channelUuid: training.day,
        description: training.gym,
      };
    });
  };

  const epgs = useMemo(() => TrainingsByGym.map((gym) => epgMaker(gym)), [TrainingsByGym]);

  const epgConfig = {
    startDate: "2000-01-01T18:00:00",
    endDate: "2000-01-01T23:00:00",
    dayWidth: 2000,
  };

  // Utiliser le hook useEpg pour obtenir les props nécessaires pour chaque epg non vide
  const epgProps = useMemo(
    () =>
      epgs.map((epg) => {
        if (epg.length === 0) return null;

        const { getEpgProps, getLayoutProps } = useEpg({
          epg,
          channels,
          ...epgConfig,
        });

        return { getEpgProps, getLayoutProps };
      }),
    [epgs, channels, epgConfig]
  );

  return (
    <CardLayout pageTitle="Planning">
      {epgProps.map((props, index) => {
        if (!props) return null; // Skip if props is null
        return (
          <Epg key={index} {...props.getEpgProps()}>
            <Layout {...props.getLayoutProps()} />
          </Epg>
        );
      })}
    </CardLayout>
  );
}
