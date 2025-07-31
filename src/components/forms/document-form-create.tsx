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
import { create } from '@/core//presentation/actions/documents/create'
import { uploadFile } from '@/core/shared/utils/upload'
import { Loading } from '@/components/ui/loading'

type PropsType = {
  actions: {
    success: () => void
    cancel: () => void
  }
}
const MAX_FILE_SIZE = 4.9 * 1024 * 1024 // 4.9MB

const DocumentFormSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  file: z
    .instanceof(File, { message: 'Le fichier est requis' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `La taille du fichier doit être inférieure à ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    ),
})

type DocumentFormValues = z.infer<typeof DocumentFormSchema>

export function DocumentFormCreate({ actions }: Readonly<PropsType>) {
  const [loading, setLoading] = useState(false)

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(DocumentFormSchema),
  })

  const mutation = useMutation({
    mutationFn: async (data: DocumentFormValues) => {
      const fileUrl = await uploadFile(data.file, 'documents')
      const size = data.file.size

      // Créer le payload sans l'objet File pour la Server Action
      const payload = {
        title: data.title,
        description: data.description,
        size,
        url: fileUrl,
      }

      await create(payload)
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

        {
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fichier</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-1.5">
                    <Input
                      id="file-input"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file)
                        }
                      }}
                      disabled={mutation.isPending}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                    {mutation.isPending && <Loading />}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        }

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
            {loading ? `Upload en cours ` : 'Envoyer'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
