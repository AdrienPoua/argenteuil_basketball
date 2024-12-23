"use client";
import { useQuery } from "react-query";
import { getClubs } from "@/database/services/Club";
import { z } from "zod";


export default function useFetchClubs() {
  const { data, isLoading, error, isFetching } = useQuery(
    ["clubs"],
    () => getClubs(),
  );
  return { data, isLoading, error, isFetching };
}

const correspondantSchema = z.object({
  number: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});

const clubSchema = z.object({
  name: z.string(),
  correspondant: correspondantSchema.optional(),
  _id: z.string(),
});

type TClub = z.infer<typeof clubSchema>;
