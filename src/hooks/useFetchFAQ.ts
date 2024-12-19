"use client";
import { getFAQ } from "@/database/controllers/FAQ";
import { useQuery, useQueryClient } from "react-query";

export default function useFetchFAQ() {
  const queryClient = useQueryClient();
  const invalidateFAQQuery = () => {
    queryClient.invalidateQueries(["faq"]);
  };
  const { data, isLoading, error } = useQuery(["faq"], () => getFAQ());

  return { data, isLoading, error, invalidateFAQQuery };
}
