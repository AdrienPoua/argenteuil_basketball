"use client";
import { useQuery } from "react-query";
import { getMatchs } from "@/database/controllers/matchs";
import Match from "@/models/Match";

const fetchMatchs = async () => {
  const matchs = await getMatchs();
  return matchs;
};

export default function useFetchMatchs() {
  const { data, isLoading, error } = useQuery(["matchs"], fetchMatchs);
  const matchs = data?.map((match) => new Match(match));
  const matchsByMonth = matchs && Match.groupByMonth(matchs);
  return { data: matchsByMonth, isLoading, error };
}
