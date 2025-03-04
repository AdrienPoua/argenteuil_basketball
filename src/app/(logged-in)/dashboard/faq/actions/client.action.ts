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

  const updateFAQ = useCallback(
    async (faq: Prisma.FAQGetPayload<{}>, data: { question: string; answer: string }) => {
      try {
        await fetch(`/api/faq/${faq.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...faq, ...data }),
        });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [router],
  );

  return { updateFAQ };
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

export const useEditFAQForm = (faq: Prisma.FAQGetPayload<{}>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: faq.question,
      answer: faq.answer,
      position: faq.position,
    },
  });

  return form;
};
