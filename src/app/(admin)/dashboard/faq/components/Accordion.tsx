"use client"
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pushRank, deleteFAQ, downRank } from "../actions/server.actions";
import { Prisma } from "@prisma/client";

type PropsType = {
    faq: Prisma.FAQGetPayload<{}>
}

export default function Index({ faq }: Readonly<PropsType>) {
    const push = async () => {
        await pushRank(faq);
    }
    const deleteFaq = async () => {
        await deleteFAQ(faq.id);
    }
    const down = async () => {
        await downRank(faq);
    }
    return (
        <div className="flex" key={faq.id}>
            <Accordion type="single" collapsible className="w-full" >
                <AccordionItem value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                        <p>{faq.answer}</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex">
                <Button className="h-full" onClick={push}>
                    ⏫
                </Button>
                <Button className="h-full" onClick={deleteFaq}>
                    ❌
                </Button>
                <Button className="h-full" onClick={down}>
                    ⏬
                </Button>
            </div>
        </div>
    )
}