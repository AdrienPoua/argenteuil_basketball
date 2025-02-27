'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { useFAQActions } from '../actions/client.action';

type PropsType = {
  faq: Prisma.FAQGetPayload<{}>;
};

export default function FAQItem({ faq }: Readonly<PropsType>) {
  const { upgradeFAQ, downgradeFAQ, deleteFAQ } = useFAQActions();

  return (
    <Card className='mb-4 w-full p-3'>
      <CardContent>
        <div className='w-full'>
          <div>
            <div className='bg-primary p-3'>{faq.question}</div>
            <div>
              <p className='border border-black p-3 text-background'>{faq.answer}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex space-x-2'>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='icon' onClick={() => upgradeFAQ(faq)}>
              <ChevronUp className='h-4 w-4' />
            </Button>
            <p className='text-sm text-primary'> Mettre plus haut </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='icon' onClick={() => downgradeFAQ(faq)}>
              <ChevronDown className='h-4 w-4' />
            </Button>
            <p className='text-sm text-primary'> Mettre plus bas </p>
          </div>
        </div>
        <Button variant='destructive' size='icon' onClick={() => deleteFAQ(faq)}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </CardFooter>
    </Card>
  );
}
