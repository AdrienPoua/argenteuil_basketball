'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SearchBar } from '@/components/ui/searchBar';
import { Faq } from '@/core/domain/entities/faq.entity';

type PropsType = {
  faq: Faq[];
};

export default function FaqComponents({ faq }: Readonly<PropsType>) {
  const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>(faq);

  return (
    <div className='relative'>
      <div className='relative z-10 mx-auto flex max-w-4xl flex-col gap-8'>
        {/* Search Section */}
        <div className='group relative px-5'>
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100' />
          <div className='relative rounded-2xl border border-border/50 bg-background/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='rounded-lg bg-primary/10 p-2'>
                <Search className='h-5 w-5 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-primary'>Rechercher dans la FAQ</h3>
            </div>
            <SearchBar
              placeholder='Tapez votre question ou mot-clé...'
              allItems={faq}
              setState={setFilteredFaqs}
              searchKey={['question', 'answer']}
            />
          </div>
        </div>

        {/* FAQ Results */}
        <div className='mx-10 space-y-4'>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, index) => (
              <div key={item.id} className='group relative'>
                <Accordion type='single' collapsible className='w-full'>
                  <AccordionItem value={item.id} className='border-none'>
                    <AccordionTrigger className='group/trigger bg-gradient-to-r from-primary via-primary/80 to-primary px-6 py-4 hover:no-underline'>
                      <div className='flex items-center gap-4 text-left'>
                        {/* Question Number */}
                        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-sm font-bold text-white'>
                          {index + 1}
                        </div>

                        {/* Question Icon & Text */}
                        <div className='flex flex-1 items-center gap-3'>
                          <span className='font-semibold text-background transition-colors duration-300'>
                            {item.question}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className='px-6 pb-6'>
                      <div className='ml-12 border-l-2 border-primary/20 pl-4'>
                        <div className='rounded-lg bg-muted/30 p-4'>
                          <p className='leading-relaxed text-muted-foreground'>{item.answer}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          ) : (
            /* No Results State */
            <div className='py-16 text-center'>
              <div className='relative mx-auto mb-6 h-24 w-24'>
                <div className='absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-primary/20 to-secondary/20' />
                <div className='relative flex h-full w-full items-center justify-center rounded-full border border-border/50 bg-background'>
                  <Search className='h-8 w-8 text-muted-foreground' />
                </div>
              </div>
              <h3 className='mb-2 text-xl font-semibold text-muted-foreground'>Aucun résultat trouvé</h3>
              <p className='text-muted-foreground'>Essayez avec d&apos;autres mots-clés ou reformulez votre question</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {filteredFaqs.length > 0 && (
          <div className='text-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-border/30 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 text-muted-foreground backdrop-blur-sm'>
              <span className='animate-pulse text-primary'>💡</span>
              <span>
                {filteredFaqs.length} question{filteredFaqs.length > 1 ? 's' : ''} trouvée
                {filteredFaqs.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
