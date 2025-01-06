import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQService } from "@/database/services/FAQ";


export default async function Index() {
  const faq = await new FAQService().getFaqs();
  return (
    <>
      <H1> Vos questions </H1>
      <MainSection>
        <div className="max-w-[800px] flex justify-center mx-auto mb-10">
        </div>
        <div className="flex flex-col gap-5 max-w-[800px] mx-auto">
          {faq.map((item) => (
            <Accordion type="single" collapsible className="w-full" key={item.id}>
              <AccordionItem value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="p-5 bg-foreground text-background">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </MainSection >
    </>
  );
}
