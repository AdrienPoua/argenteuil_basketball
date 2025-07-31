'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DocumentEntity } from '@/core/domain/entities/document.entity'
import { update } from '@/core//presentation/actions/documents/update'

type PropsType = {
  actions: {
    success: () => void
    cancel: () => void
  }
  currentDocument: DocumentEntity
}

const DocumentFormSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  created_at: z.string(),
})

type DocumentFormValues = z.infer<typeof DocumentFormSchema>

export function DocumentFormUpdate({ actions, currentDocument }: Readonly<PropsType>) {
  const [loading, setLoading] = useState(false)

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(DocumentFormSchema),
    defaultValues: {
      title: currentDocument.title,
      description: currentDocument.description,
      created_at: currentDocument.created_at,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: DocumentFormValues) => {
      const payload = {
        ...data,
        id: currentDocument.id,
      }

      await update(payload)
    },
    onSuccess: () => {
      form.reset()
      actions.success()
      toast.success('Document enregistré avec succès.')
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error)
      form.setError('root', {
        message: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
      })
      toast.error("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.")
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const onSubmit = async (data: DocumentFormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} disabled={mutation.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} disabled={mutation.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mutation.isError && (
          <div className="text-sm text-destructive">{mutation.error.message}</div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => {
              actions.cancel()
            }}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {loading ? `Upload en cours ` : 'Mettre à jour'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
