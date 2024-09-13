"use client";
import { useQuery } from "react-query";
import { getMatchs } from "@/lib/mongo/controllers/matchs";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";
import Match from "@/utils/models/Match";
import { SAISON_MONTH_ORDER } from "@/utils/magicNumber";
import { inflateRaw } from "zlib";

const fetchMatchs = async () => {
  const matchs = await getMatchs();
  ValidateWithZod(matchs, SDatabase.Match);
  return matchs;
};

export default function useFetchMatchs() {
  const { data, isLoading, error } = useQuery(["matchs"], fetchMatchs);
  const matchs = data?.map((match) => new Match(match));
  const matchsByMonth = matchs && Match.groupByMonth(matchs);
  return { data: matchsByMonth, isLoading, error };
}
