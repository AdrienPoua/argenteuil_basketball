'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { TarifCategory, TarifEntity } from '@/core/domain/entities/tarif.entity'
import { upsertTarif } from '@/core/presentation/actions/tarifs/upsert'

const tarifFormSchema = z.object({
  price: z.number().min(0, 'Le prix doit être positif'),
  min_age: z.number().min(0, "L'âge minimum doit être positif"),
  max_age: z.number().min(0, "L'âge maximum doit être positif"),
  category: z.nativeEnum(TarifCategory, {
    errorMap: () => ({ message: 'Veuillez sélectionner une catégorie' }),
  }),
  mutation_price: z.number().min(0, 'Le prix de mutation doit être positif'),
})

type TarifFormValues = z.infer<typeof tarifFormSchema>

type PropsType = {
  actions: {
    success: () => void
  }
  currentTarif: TarifEntity | null
}

export function TarifForm({ actions, currentTarif }: Readonly<PropsType>) {
  const form = useForm<TarifFormValues>({
    resolver: zodResolver(tarifFormSchema),
    defaultValues: {
      price: currentTarif?.price ?? 0,
      category: currentTarif?.category ?? TarifCategory.U07,
      min_age: currentTarif?.min_age ?? 0,
      max_age: currentTarif?.max_age ?? 0,
      mutation_price: currentTarif?.mutation_price ?? 0,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: TarifFormValues) => {
      await upsertTarif({ ...currentTarif?.toObject(), ...data })
    },
    onSuccess: () => {
      form.reset()
      actions.success()
      toast.success('Tarif enregistré avec succès.')
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error)
      toast.error("Une erreur est survenue lors de l'enregistrement.")
    },
  })

  const onSubmit = async (data: TarifFormValues) => {
    mutation.mutate(data)
  }

  const label = currentTarif ? 'Modifier' : 'Créer'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={mutation.isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TarifCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min_age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge minimum</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  {...field}
                  disabled={mutation.isPending}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge maximum</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  {...field}
                  disabled={mutation.isPending}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix de base (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    disabled={mutation.isPending}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mutation_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix mutation (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    disabled={mutation.isPending}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {mutation.isError && (
          <div className="text-sm text-destructive">{mutation.error?.message}</div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={mutation.isPending || !form.formState.isValid}>
            {label}
          </Button>
        </div>
      </form>
    </Form>
  )
}
