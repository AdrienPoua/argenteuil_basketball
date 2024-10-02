"use client";
import { useState, ReactElement } from "react";
import SearchBar from "@/components/SearchBar";
import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import useFetchFAQ from "@/utils/hooks/DBFetch/useFetchFAQ";
import Feedback from "@/components/FetchFeedback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";




export default function Index(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: FAQlist, isLoading, error } = useFetchFAQ();
  const filteredFAQ = FAQlist?.filter((item: { question: string, answer: string, rank: number, _id: string }) => searchQuery.length === 0 || item.question.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <H1> Vos questions </H1>
      <MainSection>
        <div className="max-w-[800px] flex justify-center mx-auto mb-10">
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        <Feedback isLoading={isLoading} error={error} data={FAQlist} >
          <div className="flex flex-col gap-5 max-w-[800px] mx-auto">
            {filteredFAQ?.map((item: { question: string, answer: string, rank: number, _id: string }) => (
              <Accordion type="single" collapsible className="w-full" key={item._id}>
                <AccordionItem value={item._id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </Feedback>
      </MainSection >
    </>
  );
}
