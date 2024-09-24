"use client";
import { useQuery } from "react-query";
import { getLeaders } from "@/lib/mongo/controllers/staff";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";
import { TDatabase } from "@/utils/types";

type LeaderType = TDatabase.Staff & {
  job: string;
};

const fetchLeaders = async () : Promise<LeaderType[]> => {
  const staff = await getLeaders();
  ValidateWithZod(staff, SDatabase.Staff);
  return staff;
};

export default function useFetchLeaders() {
  const { data, isLoading, error, isFetching } = useQuery(["leaders"], fetchLeaders);
  return { data, isLoading, error, isFetching };
}
