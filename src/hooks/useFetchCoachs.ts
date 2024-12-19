"use client";
import { useQuery } from "react-query";
import { getCoachs } from "@/database/controllers/staff";
import { useState, useEffect } from "react";
import { Coach } from "@/models";


export default function useFetchCoachs() {
  const [coachs, setCoachs] = useState<Coach[]>();
  const { data, isLoading, error, isFetching } = useQuery(
    ["coachs"],
    () => getCoachs(),
  );
  useEffect(() => {
    if (data) {
      setCoachs(data.map((coach) => new Coach({ ...coach, id: coach._id })));
    }
  }, [data]);

  return { coachs, isLoading, error, isFetching };
}
