"use client";
import { useQuery } from "react-query";
import { getClubs } from "@/database/controllers/clubs";
import { ValidateWithZod } from "@/utils/zod/utils/index";
import { SDatabase } from "@/utils/zod/schemas";

const fetchClubs = async (): Promise<
  {
    name: string;
    correspondant: {
      name: string;
      email: string;
      number: string;
    };
    _id: string;
  }[]
> => {
  const clubs = await getClubs();
  ValidateWithZod(clubs, SDatabase.Club);
  return clubs;
};

export default function useFetchClubs() {
  const { data, isLoading, error, isFetching } = useQuery(
    ["clubs"],
    fetchClubs,
  );
  return { data, isLoading, error, isFetching };
}
