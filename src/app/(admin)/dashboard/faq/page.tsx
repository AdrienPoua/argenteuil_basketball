"use client";
import useFetchFAQ from "@/hooks/useFetchFAQ";
import Feedback from "@/components/FetchFeedback";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { deleteFAQ, updateRank } from "@/database/controllers/FAQ";
import Form from "./Form";

export default function Index() {
  const { data, error, isLoading, invalidateFAQQuery } = useFetchFAQ();
  return (
    <Feedback data={data} isLoading={isLoading} error={error}>
      <div className="flex flex-col grow w-full gap-5">
        <Form />
        <div className="flex flex-col gap-3 w-[1000px] mx-auto">
          {data?.map((faq: { _id: string; question: string; answer: string; rank: number }) => (
            <div className="flex" key={faq._id}>
              <Accordion type="single" collapsible className="w-full" >
                <AccordionItem value={faq._id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex">
                <Button className="h-full" onClick={async () => { await updateRank({ id: faq._id, rank: faq.rank + 1 }); invalidateFAQQuery(); }}>
                  ⏫
                </Button>
                <Button className="h-full" onClick={async () => { await deleteFAQ(faq._id); invalidateFAQQuery(); }}>
                  ❌
                </Button>
                <Button className="h-full" onClick={async () => { await updateRank({ id: faq._id, rank: faq.rank - 1 }); invalidateFAQQuery(); }}>
                  ⏬
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Feedback>
  );
}
