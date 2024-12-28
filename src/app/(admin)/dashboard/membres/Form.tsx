"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Roles, Prisma } from "@prisma/client"
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
import { createMember } from "./actions"
import { TeamSchema } from "@/database/schemas/Team"
import { IdSchema } from "@/database/schemas/Id"
import { SessionSchema } from "@/database/schemas/Session"

export const FormSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  image: z.string().nullable(),
  isPublicEmail: z.boolean(),
  isPublicPhone: z.boolean(),
  isLeader: z.boolean(),
  role: z.array(z.nativeEnum(Roles)),
  teams: z.array(TeamSchema.merge(IdSchema).extend({ sessions: z.array(SessionSchema.merge(IdSchema)) })),
})


export default function CustomForm({ teams }: Readonly<{ teams: Prisma.TeamGetPayload<{ include: { coach: true } }>[] }>) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      image: null,
      isPublicEmail: false,
      isPublicPhone: false,
      isLeader: false,
      role: [],
      teams: [],
    },
  })

  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([])

  const roleOptions = Object.values(Roles).map(role => ({
    label: role.replace("_", " "),
    value: role,
  }))

  const teamOptions = teams.map(team => ({
    label: team.name,
    value: team.id,
  }))

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createMember(data)
  }

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
                  options={roleOptions}
                  selected={field.value}
                  onChange={(values) => {
                    setSelectedRoles(values as Roles[])
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
                  options={teamOptions}
                  selected={field.value.map(team => team.id)}
                  onChange={field.onChange}
                  placeholder="Selectionne des équipes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
