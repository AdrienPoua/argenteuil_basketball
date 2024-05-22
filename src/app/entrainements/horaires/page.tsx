"use client";
import React, { useMemo } from "react";
import { useEpg, Epg, Layout } from "planby";
import CardLayout from "@/components/layouts/CardLayout";
import data from "@/data/teams.json"
import { channel } from "diagnostics_channel";

export default function PlanningPage() {
  // Définir les jours de la semaine comme chaînes
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const channels = useMemo(
    () =>
      daysOfWeek.map((day) => ({
        logo: `https://via.placeholder.com/150?text=${day}`,
        uuid: day,
        name: day,
      })),
    []
  );

  // Définir les programmes d'entraînement
  const epg = useMemo(
    () => data.teams.flatMap(team => 
      team.trainings.map(training => ({
        channelUuid: training.day,
        description: `Entrainement pour les ${team.name}`,
        id: `${team.name}-${training.day}-${training.start}`,
        since: `2000-01-01T${training.start}:00`,
        till: `2000-01-01T${training.end}:00`,
        title: `Entrainement ${team.name}`,
      }))
    ),
    []
  );


  // Utiliser le hook useEpg pour obtenir les props nécessaires
  const {
    getEpgProps,
    getLayoutProps,
    onScrollToNow,
    onScrollLeft,
    onScrollRight,
  } = useEpg({
    epg,
    channels,
    startDate: "2000-01-01T18:00:00",
    endDate: "2000-01-01T23:00:00",
    dayWidth: 2000,
  });
  return (
    <CardLayout pageTitle='Planning'>
      <div>
        <Epg {...getEpgProps()}>
          <Layout {...getLayoutProps()} />
        </Epg>
      </div>
    </CardLayout>
  );
}
