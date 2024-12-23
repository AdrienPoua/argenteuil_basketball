"use client";
import { useQuery } from "react-query";
import { getLeaders } from "@/database/services/Members";
import { useState, useEffect } from "react";
import { Leader } from "@/models";

export default function useFetchLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>();
  const { data, isLoading, error, isFetching } = useQuery(["leaders"], () =>
    getLeaders(),
  );
  useEffect(() => {
    if (data) {
      setLeaders(data.map((leader) => new Leader(leader)));
    }
  }, [data]);

  return { leaders, isLoading, error, isFetching };
}
