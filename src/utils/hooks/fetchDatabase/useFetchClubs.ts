"use client";
import { useQuery } from "react-query";
import { getClubs } from "@/lib/mongo/controllers/clubs";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";

const fetchClubs = async () => {
  const clubs = await getClubs();
  ValidateWithZod(clubs, SDatabase.Club);
  return clubs;
};

export default function useFetchClubs() {
  const { data, isLoading, error, isFetching } = useQuery(["clubs"], fetchClubs);
  return { data, isLoading, error, isFetching };
};
