'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formSchema } from './formSchema'
import uploadImage from '@/hooks/use-uploadImage'
import { createStaff, updateStaff } from '@/lib/mongo/controllers/staff'
import { useQueryClient } from "react-query"



type FormValues = z.infer<typeof formSchema>
interface ZodFormProps {
  defaultValues?: Partial<Omit<FormValues, 'teams'>> & { id: string, teams: string[] }
}

export default function ZodForm({ defaultValues }: Readonly<ZodFormProps>) {
  const queryClient = useQueryClient()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? 'salut',
      email: defaultValues?.email ?? '',
      number: defaultValues?.number ?? '',
      teams: defaultValues?.teams?.map(team => ({ name: team })) ?? [],
      job: defaultValues?.job ?? '',
      image: defaultValues?.image ?? undefined,
      isEmailDisplayed: defaultValues?.isEmailDisplayed ?? false,
      isNumberDisplayed: defaultValues?.isNumberDisplayed ?? false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'teams'
  });




  async function onSubmit(data: FormValues) {
    try {
      if (data.image && data.image instanceof File) {
        const imageUrl: string | undefined = await uploadImage(data.image)
        data.image = imageUrl
      }
      if (defaultValues) {
        await updateStaff(defaultValues.id, { ...data, image: data.image as string, teams: data?.teams?.map(team => team.name) })
      } else {
        await createStaff({ ...data, image: data.image as string, teams: data?.teams?.map(team => team.name) })
      }
      queryClient.invalidateQueries(["staff"]);
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-md mx-auto bg-foreground border border-primary/50 rounded-xl p-3 font-secondary ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel >Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel >Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel >Numéro</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Votre numéro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teams"
          render={() => (
            <FormItem className="text-background flex flex-col gap-2">
              <FormLabel>Équipes</FormLabel>
              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="flex gap-3 items-center">
                    <FormControl>
                      <Input
                        defaultValue={field.name}
                        placeholder={`Équipe ${index + 1}`}
                        {...form.register(`teams.${index}.name`)}
                      />
                    </FormControl>
                    <Button
                      onClick={() => remove(index)}  // Remove team
                      type="button"
                    >
                      Supprimer
                    </Button>
                  </div>
                );
              })}
              <Button
                onClick={() => append({ name: "" })}  // Add new team
                type="button"
              >
                Ajouter une équipe
              </Button>
              <FormDescription>Ce champ est optionnel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel >Poste</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger >
                    <SelectValue placeholder="Sélectionnez un poste" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Entraineur">Entraineur</SelectItem>
                  <SelectItem value="Président">Président</SelectItem>
                  <SelectItem value="Trésorier">Trésorier</SelectItem>
                  <SelectItem value="Correspondant">Correspondant</SelectItem>
                  <SelectItem value="Secrétaire Général">Secrétaire Général</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription >Ce champ est optionnel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel >Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormDescription >Ce champ est optionnel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isEmailDisplayed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}

                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel >
                  Afficher l&apos;email
                </FormLabel>
                <FormDescription >
                  Cochez cette case pour afficher votre email publiquement
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isNumberDisplayed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}

                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel >
                  Afficher le numéro
                </FormLabel>
                <FormDescription >
                  Cochez cette case pour afficher votre numéro publiquement
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
      </form>
    </Form >
  )
}



