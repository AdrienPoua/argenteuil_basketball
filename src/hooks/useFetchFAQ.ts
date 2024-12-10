"use client";
import { getFAQ } from "@/database/controllers/FAQ";
import { useQuery, useQueryClient } from "react-query";
import { z } from "zod";

const FAQSchema = z.object({  
  question: z.string(),
  answer: z.string()
});

type TSchema = {
  FAQ: z.infer<typeof FAQSchema>;
};

const fetchFAQ = async () => {
  const faq = await getFAQ();
  return z.array(FAQSchema).parse(faq);
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
