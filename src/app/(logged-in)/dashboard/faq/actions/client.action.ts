'use client';

import { useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { useCallback } from 'react';
import { formSchema } from '../schemas/form.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useFAQActions = () => {
  const router = useRouter();

  const upgradeFAQ = useCallback(
    async (faq: Prisma.FAQGetPayload<{}>) => {
      try {
        await fetch(`/api/faq/${faq.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...faq, position: faq.position + 1 }),
        });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [router],
  );

  const downgradeFAQ = useCallback(
    async (faq: Prisma.FAQGetPayload<{}>) => {
      try {
        await fetch(`/api/faq/${faq.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...faq, position: faq.position - 1 }),
        });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [router],
  );

  const deleteFAQ = useCallback(
    async (faq: Prisma.FAQGetPayload<{}>) => {
      try {
        await fetch(`/api/faq/${faq.id}`, {
          method: 'DELETE',
        });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [router],
  );

  return { upgradeFAQ, downgradeFAQ, deleteFAQ };
};

export const useCustomForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      answer: '',
      position: 0,
    },
  });

  return form;
};
