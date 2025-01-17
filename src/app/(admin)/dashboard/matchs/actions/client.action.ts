"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PropsType, FormValues } from "../types/form.types";
import { formSchema } from "../schemas/form.schema";
import { useState, useMemo } from "react";
import ClubData from "@/data/club.json";
import { PropsType as GridPropsType } from "../types/grid.types";

export const useMatchForm = (match: PropsType["match"]) => {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: match.date.toISOString().split("T")[0],
      time: match.date.toLocaleTimeString(),
      salle: match.salle,
    },
  });
};

export const useCardFilter = (matchs: GridPropsType["matchs"]) => {
    const [selectedCompetition, setSelectedCompetition] = useState("ALL")
  const [place, setPlace] = useState("all")

  const competitions = useMemo(() => {
    return Array.from(new Set(matchs.map((match) => match.championnat ?? "Unknown")))
  }, [matchs])

  const sortedMatches = useMemo(() => {
    return [...matchs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [matchs])

  const filteredByCompetition = useMemo(() => {
    return sortedMatches.filter(
      (match) =>
        match.championnat === selectedCompetition || selectedCompetition === "ALL"
    )
  }, [sortedMatches, selectedCompetition])

  const homeGames = useMemo(() => {
    return filteredByCompetition.filter(
      (match) => match.idOrganismeEquipe1 === ClubData.id
    )
  }, [filteredByCompetition])

  const awayGames = useMemo(() => {
    return filteredByCompetition.filter(
      (match) => match.idOrganismeEquipe1 !== ClubData.id
    )
  }, [filteredByCompetition])

  const displayedGames = useMemo(() => {
    if (place === "all") return filteredByCompetition
    return place === "home" ? homeGames : awayGames
  }, [place, filteredByCompetition, homeGames, awayGames])

  return {
    selectedCompetition,
    place,
    setSelectedCompetition,
    setPlace,
    displayedGames,
    competitions,
  }
}
