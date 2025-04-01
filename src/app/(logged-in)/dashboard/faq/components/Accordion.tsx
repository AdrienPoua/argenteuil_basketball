'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { useFAQActions } from '../actions/client.action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EditFAQForm from './EditForm';
import { useRouter } from 'next/navigation';
type PropsType = {
  faq: Prisma.FAQGetPayload<{}>;
  totalFaqs?: number;
};

// Génère un tableau de 1 à maxPosition
const generatePositionOptions = (maxPosition: number) => {
  return Array.from({ length: maxPosition }, (_, i) => i + 1);
};

export default function FAQItem({ faq, totalFaqs = 10 }: Readonly<PropsType>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const positionOptions = generatePositionOptions(totalFaqs);
  const router = useRouter();

  const handlePositionChange = async (value: string) => {
    const { id, ...payload } = faq;
    try {
      await fetch(`/api/faq/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...payload, position: parseInt(value) }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFAQ = useCallback(async () => {
    await fetch(`/api/faq/${faq.id}`, {
      method: 'DELETE',
    });
    router.refresh();
  }, [faq.id, router]);

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card className='w-full bg-transparent shadow-sm transition-shadow duration-200 hover:shadow-md'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1' className='border-none'>
            <div className='flex items-center justify-between px-6 py-4'>
              <div className='flex flex-1 items-center gap-3'>
                <AccordionTrigger
                  onClick={() => setIsExpanded(!isExpanded)}
                  className='bg-transparent text-lg font-semibold text-foreground hover:no-underline'
                >
                  {faq.question}
                </AccordionTrigger>
              </div>

              <div className='ml-4 flex flex-shrink-0 items-center gap-3'>
                <Select onValueChange={handlePositionChange} defaultValue={faq.position.toString()}>
                  <SelectTrigger className='w-[130px] text-foreground'>
                    <SelectValue placeholder='Position' />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((position) => (
                      <SelectItem key={position} className='text-background' value={position.toString()}>
                        Position {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button size='icon' onClick={() => setIsEditModalOpen(true)}>
                  <Edit className='h-4 w-4' />
                </Button>

                <Button variant='destructive' size='icon' onClick={() => deleteFAQ()}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>

            <AccordionContent className='px-6 py-4'>
              <div className='rounded-lg border p-4 text-foreground'>{faq.answer}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='text-xl font-bold'>Modifier la FAQ</DialogTitle>
          </DialogHeader>
          <EditFAQForm faq={faq} onCancel={() => setIsEditModalOpen(false)} onSuccess={handleEditSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
}
