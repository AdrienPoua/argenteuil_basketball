"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FaqEntity } from "@/core/domain/entities/faq.entity"
import { upsert } from "@/core//presentation/actions/faq/upsert"
import { Loading } from "@/components/ui/loading"

const faqFormSchema = z.object({
  question: z.string().min(5, "La question doit contenir au moins 5 caractères"),
  answer: z.string(),
  order: z.number().int().min(0, "L'ordre doit être un nombre positif"),
})

type FaqFormValues = z.infer<typeof faqFormSchema>

type PropsType = {
  actions: {
    success: () => void
  }
  currentFaq: FaqEntity | null
}

export function FaqForm({ actions, currentFaq }: Readonly<PropsType>) {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: currentFaq?.question ?? "",
      answer: currentFaq?.answer ?? "",
      order: currentFaq?.order ?? 0,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: FaqFormValues) => {
      await upsert({ ...currentFaq?.toObject(), ...data })
    },
    onSuccess: () => {
      form.reset()
      actions.success()
      toast.success("Question enregistrée avec succès.")
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error)
      toast.error("Une erreur est survenue lors de l'enregistrement.")
    },
  })

  const onSubmit = async (data: FaqFormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input {...field} disabled={mutation.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réponse</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} disabled={mutation.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ordre d&apos;affichage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  disabled={mutation.isPending}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Les FAQs seront affichées par ordre croissant (0 en premier)</FormDescription>
            </FormItem>
          )}
        />

        {mutation.isError && <div className="text-destructive text-sm">{mutation.error?.message}</div>}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Loading /> : "Ajouter"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
