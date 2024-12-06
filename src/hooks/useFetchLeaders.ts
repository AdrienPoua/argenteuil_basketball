"use client";
import { useQuery } from "react-query";
import { getLeaders } from "@/database/controllers/staff";
import { ValidateWithZod } from "@/utils/zod/utils/index";
import { SDatabase } from "@/utils/zod/schemas";
import { useState, useEffect } from "react";
import { Leader } from "@/models";

const fetchLeaders = async () => {
  const leaders = await getLeaders();
  ValidateWithZod(leaders, SDatabase.Leader);
  return leaders;
};

export default function useFetchLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>();
  const { data, isLoading, error, isFetching } = useQuery(["leaders"], fetchLeaders);
  useEffect(() => {
    if (data) {
      setLeaders(data.map((leader) => new Leader(leader)));
    }
  }, [data]);

  return { leaders, isLoading, error, isFetching };
}
