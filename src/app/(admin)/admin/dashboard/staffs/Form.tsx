'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { formSchema } from './formSchema'
import uploadImage from '@/hooks/use-uploadImage'
import { createStaff } from '@/lib/mongo/controllers/staff'
import { useQueryClient } from "react-query";



type FormValues = z.infer<typeof formSchema>

export default function ZodForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teams, setTeams] = useState<string[]>([])
  const queryClient = useQueryClient()
  const resetForm = () => {
    queryClient.invalidateQueries(["staff"]);
    form.reset()
    setTeams([])
    setIsSubmitting(false)
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      number: '',
      teams: '',
      job: '',
      image: undefined,
      isEmailDisplayed: false,
      isNumberDisplayed: false,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      if (data.image) {
        const imageUrl = await uploadImage(data.image as File)
        data.image = imageUrl
      }
      await createStaff({ ...data, image: data.image as string, teams })
      resetForm()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-md mx-auto border border-primary/50 rounded-xl p-3 font-secondary ">
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
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel >Équipes</FormLabel>
              {teams.map((team, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <p className="text-primary">{team}</p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setTeams((prev) => prev.filter((_, i) => i !== index));
                    }}>
                    Supprimer
                  </Button>
                </div>
              ))}
              <div className="flex gap-3"> <FormControl>
                <Input
                  placeholder="U17M-1   U09F-2"
                  {...field}

                />
              </FormControl>
                <Button onClick={(e) => {
                  e.preventDefault()
                  setTeams((prev) => [...prev, field.value].filter((team): team is string => team !== undefined && team.length > 0));
                  field.onChange('');
                }}>Ajouter une équipe</Button> </div>
              <FormDescription >Ce champ est optionnel</FormDescription>
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
      </form>
    </Form >
  )
}
