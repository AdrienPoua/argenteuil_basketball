"use client";
import { useQuery } from "react-query";
import { getLeaders } from "@/lib/mongo/controllers/staff";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";
import { useState, useEffect } from "react";
import { Leader } from "@/utils/models";

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
      console.log("🚀 ~ useEffect ~ data:", data)
      setLeaders(data.map((leader) => new Leader(leader)));
    }
  }, [data]);

  return { leaders, isLoading, error, isFetching };
}
