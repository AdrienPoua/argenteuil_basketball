"use client";
import useFetchFAQ from "@/hooks/useFetchFAQ";
import Feedback from "@/components/FetchFeedback";
import { useFAQ } from "@/hooks/useFAQ";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Textarea } from "@/components/ui/textarea"; // ShadCN UI Textarea
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { deleteFAQ, updateRank } from "@/database/controllers/FAQ";

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

// Form Component for creating a new FAQ
const Form = () => {
  const { create } = useFAQ();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(new FormData(e.target as HTMLFormElement));
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-[800px] mx-auto p-5 gap-3"
    >
      <div className="flex gap-3">
        <div className="flex gap-3">
          <Textarea
            name="question"
            id="question-input"
            placeholder="Votre question ici"
            className="placeholder-black"
          />
        </div>
        <div>
          <Textarea
            name="answer"
            id="answer-input"
            placeholder="Votre réponse ici"
            className="placeholder-black"
          />
        </div>
      </div>
      <Button type="submit" >
        Envoyer
      </Button>
    </form>
  );
};