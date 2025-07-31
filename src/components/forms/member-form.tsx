"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Upload, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MemberEntity, MemberRole } from "@/core/domain/entities/member.entity"
import { upsert } from "@/core//presentation/actions/members/upsert"
import { uploadFile } from "@/core/shared/utils/upload"
import { Loading } from "@/components/ui/loading"
import { MultiSelect } from "@/components/ui/multi-select"

const roleSchema = z.enum(Object.values(MemberRole) as [string, ...string[]], {
  required_error: "Le rôle est requis",
  message: "Le rôle est requis",
})

const memberFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().optional(),
  phone: z.string().optional(),
  file: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
  role: z.array(roleSchema),
  contact_privacy: z.object({
    showEmail: z.boolean(),
    showPhone: z.boolean(),
  }),
})

type MemberFormValues = z.infer<typeof memberFormSchema>

type PropsType = {
  actions: {
    success: () => void
  }
  currentMember: MemberEntity | null
}

export function MemberForm({ actions, currentMember }: Readonly<PropsType>) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentMember?.image)

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      firstName: currentMember?.first_name ?? "",
      lastName: currentMember?.last_name ?? "",
      email: currentMember?.email ?? undefined,
      phone: currentMember?.phone ?? undefined,
      imageUrl: currentMember?.image ?? undefined,
      file: undefined,
      role: currentMember?.role ?? [],
      contact_privacy: currentMember?.contact_privacy ?? { showEmail: true, showPhone: true },
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: MemberFormValues) => {
      // Upload file in client because the server action limit the size of the body
      let imageUrl = data.imageUrl

      // Si un nouveau fichier est fourni, l'uploader
      if (data.file) {
        imageUrl = await uploadFile(data.file, "members")
      }
      await upsert({
        ...data,
        id: currentMember?.id,
        image: imageUrl,
      })
    },
    onSuccess: () => {
      form.reset()
      setPreviewImage(undefined)
      actions.success()
      toast.success("Membre enregistré avec succès.")
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error)
      toast.error("Une erreur est survenue lors de l'enregistrement.")
    },
  })

  const onSubmit = async (data: MemberFormValues) => {
    mutation.mutate(data)
  }

  const actionLabel = currentMember ? "Mettre à jour" : "Créer"

  const removeImage = () => {
    form.setValue("file", undefined)
    form.setValue("imageUrl", "")
    setPreviewImage(undefined)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Section image */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={previewImage} className="object-cover" />
            <AvatarFallback className="text-lg">
              {currentMember?.first_name?.charAt(0) ?? form.watch("firstName")?.charAt(0) ?? "M"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo de profil</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        id="member-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            // Vérifier la taille (max 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("L'image ne doit pas dépasser 5MB")
                              return
                            }
                            const url = URL.createObjectURL(file)
                            field.onChange(file)
                            setPreviewImage(url)
                          }
                        }}
                        className="hidden"
                        disabled={mutation.isPending}
                      />
                      <label
                        htmlFor="member-image"
                        className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choisir une image
                      </label>
                      {previewImage && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeImage}
                          disabled={mutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} disabled={mutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} disabled={mutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled={mutation.isPending} />
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
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input {...field} type="tel" disabled={mutation.isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <MultiSelect
              label="Rôle"
              options={Object.values(MemberRole)}
              getOptionLabel={(c) => c}
              getOptionValue={(c) => c}
              selectedValues={field.value ?? []}
              onChange={field.onChange}
              disabled={mutation.isPending}
            />
          )}
        />

        <div className="space-y-2">
          <FormLabel>Préférences de confidentialité</FormLabel>

          <FormField
            control={form.control}
            name="contact_privacy.showEmail"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Afficher mon email</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_privacy.showPhone"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Afficher mon téléphone</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {mutation.isError && <div className="text-destructive text-sm">{mutation.error?.message}</div>}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" disabled={mutation.isPending}>
            Annuler
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Loading /> : actionLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}
