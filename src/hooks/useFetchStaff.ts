"use client";
import { useQuery } from "react-query";
import { getStaff } from "@/database/controllers/staff";

export default function useFetchStaff() {
  const {
    data: staff,
    isLoading,
    error,
    isFetching,
  } = useQuery(["staff"], () => getStaff());

  return { staff, isLoading, error, isFetching };
}
