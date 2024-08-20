"use client";
import { useQuery } from "react-query";
import { getMatchs } from "@/lib/mongo/controllers/matchs";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";

const fetchMatchs = async () => {
  const matchs = await getMatchs();
  ValidateWithZod(matchs, SDatabase.Match);
  return matchs;
};

export default function useFetchMatchs() {
  const { data, isLoading, error } = useQuery(["matchs"], fetchMatchs);
  return { data, isLoading, error };
};
