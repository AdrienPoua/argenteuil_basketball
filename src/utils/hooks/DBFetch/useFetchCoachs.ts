"use client";
import { coachs } from '@/utils/services/dataProcessing';
import { useQuery } from "react-query";
import { getCoachs } from "@/lib/mongo/controllers/staff";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";
import { useState, useEffect } from "react";
import { Coach } from "@/utils/models";


const fetchCoachs = async () => {
  const coachs = await getCoachs();
  ValidateWithZod(coachs, SDatabase.Coach);
  return coachs;
};

export default function useFetchCoachs() {
  const [coachs, setCoachs] = useState<Coach[]>();
  const { data, isLoading, error, isFetching } = useQuery(["coachs"], fetchCoachs);
  useEffect(() => {
    if (data) {
      setCoachs(data.map((coach) => new Coach(coach)));
    }
  }, [data]);

  return { coachs, isLoading, error, isFetching };
}
