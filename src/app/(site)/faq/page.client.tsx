"use client"
import { Search } from "lucide-react"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SearchBar } from "@/components/ui/searchBar"
import { Faq } from "@/core/domain/entities/faq.entity"

type PropsType = {
  faq: Faq[]
}

export default function FaqComponents({ faq }: Readonly<PropsType>) {
  const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>(faq)

  return (
    <div className="relative">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8">
        {/* Search Section */}
        <div className="group relative px-5">
          <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100" />
          <div className="bg-background/80 border-border/50 hover:border-primary/30 relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <Search className="text-primary h-5 w-5" />
              </div>
              <h3 className="text-primary text-lg font-semibold">Rechercher dans la FAQ</h3>
            </div>
            <SearchBar
              placeholder="Tapez votre question ou mot-clé..."
              allItems={faq}
              setState={setFilteredFaqs}
              searchKey={["question", "answer"]}
            />
          </div>
        </div>

        {/* FAQ Results */}
        <div className="space-y-4 mx-10">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, index) => (
              <div key={item.id} className="group relative">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={item.id} className="border-none">
                    <AccordionTrigger className="group/trigger from-primary via-primary/80 to-primary bg-gradient-to-r px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        {/* Question Number */}
                        <div className="from-primary to-primary/80 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r text-sm font-bold text-white">
                          {index + 1}
                        </div>

                        {/* Question Icon & Text */}
                        <div className="flex flex-1 items-center gap-3">
                          <span className="text-background font-semibold transition-colors duration-300">
                            {item.question}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                      <div className="border-primary/20 ml-12 border-l-2 pl-4">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          ) : (
            /* No Results State */
            <div className="py-16 text-center">
              <div className="relative mx-auto mb-6 h-24 w-24">
                <div className="from-primary/20 to-secondary/20 absolute inset-0 animate-pulse rounded-full bg-gradient-to-r" />
                <div className="bg-background border-border/50 relative flex h-full w-full items-center justify-center rounded-full border">
                  <Search className="text-muted-foreground h-8 w-8" />
                </div>
              </div>
              <h3 className="text-muted-foreground mb-2 text-xl font-semibold">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground">Essayez avec d&apos;autres mots-clés ou reformulez votre question</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredFaqs.length > 0 && (
          <div className="text-center">
            <div className="from-primary/10 to-secondary/10 border-border/30 text-muted-foreground inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-6 py-3 backdrop-blur-sm">
              <span className="text-primary animate-pulse">💡</span>
              <span>
                {filteredFaqs.length} question{filteredFaqs.length > 1 ? "s" : ""} trouvée
                {filteredFaqs.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
