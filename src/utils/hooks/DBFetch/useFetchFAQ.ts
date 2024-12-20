"use client";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import { SDatabase } from "@/lib/zod/schemas";
import { getFAQ } from "@/lib/mongo/controllers/FAQ";
import { useQuery, useQueryClient } from "react-query";

const fetchFAQ = async () => {
  const faq = await getFAQ();
  ValidateWithZod(faq, SDatabase.FAQ);
  return faq;
};

export default function useFetchFAQ() {
  const queryClient = useQueryClient();
  const invalidateFAQQuery = () => {
    queryClient.invalidateQueries(["faq"]);
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["faq"],
    queryFn: fetchFAQ,
  });

  return { data, isLoading, error, invalidateFAQQuery };
}
