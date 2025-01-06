"use client"
import { z } from "zod"
import { Roles } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelect } from "@/components/ui/multi-select"
import { useState } from "react"
import Image from "next/image"
import { handleSubmit, useMemberForm } from "../actions/client.actions"
import { FormSchema } from "../schemas/form.schemas"
import { PropsType } from "../types/form.types"



export default function Index({ teams, defaultValues, setIsEditing }: Readonly<PropsType>) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)

  const form = useMemberForm(defaultValues)
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      await handleSubmit(data, defaultValues)
      setIsEditing && setIsEditing(false)
      setPreviewImage(undefined)
      form.reset()
    } catch (error) {
      console.error(error)
    }
  }
  const watchedTeams = form.watch("teams"); 
  console.log("🚀 ~ Index ~ watchedTeams:", watchedTeams)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 size-fit w-full bg-foreground p-10 rounded-md font-secondary mx-auto ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Michael Jordan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+33612345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="text-background">
              <FormLabel htmlFor="team-image">Image</FormLabel>
              <FormControl>
                <>
                  {previewImage && (
                    <Image src={previewImage} alt="Prévisualisation de l'image" className="mb-2 max-w-xs" width={200} height={200} />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        field.onChange(file);
                        setPreviewImage(url);
                      }
                    }}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublicEmail"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Email public</FormLabel>
                <FormDescription>
                  L&apos;email sera visible sur le site web
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublicPhone"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Téléphone public</FormLabel>
                <FormDescription>
                  Le téléphone sera visible sur le site web
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isLeader"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Dirigeant</FormLabel>
                <FormDescription>
                  Ce membre est un dirigeant
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                <MultiSelect
                  options={Object.values(Roles).map(role => ({
                    label: role.replace("_", " "),
                    value: role,
                  }))}
                  selected={field.value}
                  onChange={(values) => {
                    field.onChange(values)
                  }}
                  placeholder="Selectionne un role"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipes</FormLabel>
              <FormControl>
                <MultiSelect
                  options={teams.map(team => ({
                    label: team.name,
                    value: team.id,
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Selectionne des équipes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">{defaultValues ? "Modifier" : "Créer"}</Button>
      </form>
    </Form>
  )
}
