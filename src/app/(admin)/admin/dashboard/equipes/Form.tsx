'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Underline from '@/components/UnderlineDecorator'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import uploadImage from '@/hooks/use-uploadImage'
import { createTeam, updateTeam } from "@/lib/mongo/controllers/teams"
import { useQueryClient } from "react-query"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const formSchema = z.object({
    name: z.string().min(1, { message: "Le nom est requis." }),
    image: z.union([
        z.instanceof(File),
        z.string().url(),
    ]).optional(),
    coach: z.string().optional(),
    division: z.string().optional(),
    training: z.array(z.object({
        day: z.enum(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]),
        start: z.string().min(1, { message: "Le début est requis." }),
        end: z.string().min(1, { message: "La fin est requise." }),
        gym: z.enum(["Jean Guimier", "Jesse Owens"]),
    })),
});
export type FormValues = z.infer<typeof formSchema>
export interface ZodFormProps {
    defaultValues?: FormValues & { id: string }
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>
}


export default function ZodForm({ defaultValues, setIsEditing }: Readonly<ZodFormProps>) {
    const queryClient = useQueryClient()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            image: undefined,
            coach: defaultValues?.coach ?? '',
            division: defaultValues?.division ?? '',
            training: defaultValues?.training ?? [],
        },
    })
    const [previewImage, setPreviewImage] = useState<string | null>(
        typeof defaultValues?.image === 'string' ? defaultValues.image : null
    );


    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: 'training'
    });

    async function onSubmit(data: FormValues) {
        console.log("🚀 ~ onSubmit ~ data:", data)
        try {
            // if there is a image, upload it and get the string
            if (data.image && data.image instanceof File) {
                const imageUrl: string | undefined = await uploadImage(data.image)
                data.image = imageUrl
            } else if (defaultValues?.image) {
                data.image = defaultValues.image as string
            }
            const payload = { ...data, image: data.image as string | undefined }
            //if there is an id it means it's a card with data so update the team, else create a new one
            if (defaultValues?.id) {
                await updateTeam(defaultValues.id, payload)
            } else {
                await createTeam(payload)
            }
            queryClient.invalidateQueries(["teams"]);
            form.reset()
            replace([])
            setIsEditing?.(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data"
                className=" flex flex-col gap-5 w-fit mx-auto">
                <div className="flex gap-5 mx-auto">
                    <Card className="shadow-xl p-5">
                        <CardHeader className="flex justify-between items-center mb-5">
                            <CardTitle className="text-background text-4xl relative my-5">
                                Rajoutez une équipe <Underline />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="text-background">
                                        <FormLabel>Nom de l&apos;équipe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="U20" {...field} />
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
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <>
                                                {previewImage && (
                                                    <Image src={previewImage} alt="Prévisualisation de l'image" className="mb-2 max-w-xs" width={200} height={200} />
                                                )}
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        field.onChange(file);
                                                        if (file) {
                                                            // Générer une URL temporaire pour prévisualisation
                                                            const preview = URL.createObjectURL(file);
                                                            setPreviewImage(preview);
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
                                name="coach"
                                render={({ field }) => (
                                    <FormItem className="text-background">
                                        <FormLabel>Coach</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Popovich" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="division"
                                render={({ field }) => (
                                    <FormItem className="text-background">
                                        <FormLabel>Division</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Départementale" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card className="shadow-xl p-5">
                        <CardHeader className="mx-auto my-5">
                            <CardTitle className="text-black relative text-center">
                                <Underline /> Horaires d&apos;entrainements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 items-center justify-center">
                                    <FormItem className="flex flex-col gap-3">
                                        <FormLabel htmlFor={`day-${index}`}>Jour</FormLabel>
                                        <FormControl>
                                            <Select
                                                defaultValue={field.day}
                                                onValueChange={value => form.setValue(`training.${index}.day`, value as "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi")}
                                            >
                                                <SelectTrigger id={`day-${index}`} className="text-background">
                                                    <SelectValue placeholder={`Jour ${index + 1}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Lundi">Lundi</SelectItem>
                                                    <SelectItem value="Mardi">Mardi</SelectItem>
                                                    <SelectItem value="Mercredi">Mercredi</SelectItem>
                                                    <SelectItem value="Jeudi">Jeudi</SelectItem>
                                                    <SelectItem value="Vendredi">Vendredi</SelectItem>
                                                    <SelectItem value="Samedi">Samedi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem className="flex flex-col gap-3">
                                        <FormLabel htmlFor={`start-${index}`}>Début</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                id={`start-${index}`}
                                                value={form.watch(`training.${index}.start`)}
                                                onChange={(e) => form.setValue(`training.${index}.start`, e.target.value)}
                                                required
                                                className="text-black w-full"
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormItem className="flex flex-col gap-3">
                                        <FormLabel htmlFor={`end-${index}`}>Fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                id={`end-${index}`}
                                                value={form.watch(`training.${index}.end`)}
                                                onChange={(e) => form.setValue(`training.${index}.end`, e.target.value)}
                                                required
                                                className="text-black w-full"
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormItem className="flex flex-col gap-3">
                                        <FormLabel htmlFor={`gym-${index}`}>Gymnase</FormLabel>
                                        <FormControl>
                                            <Select
                                                defaultValue={field.gym}
                                                onValueChange={value => form.setValue(`training.${index}.gym`, value as "Jean Guimier" | "Jesse Owens")}
                                            >
                                                <SelectTrigger className="text-background" id={`gym-${index}`}>
                                                    <SelectValue placeholder={`Gymnase ${index + 1}`} />
                                                </SelectTrigger>
                                                <SelectContent >
                                                    <SelectItem value="Jean Guimier">Jean Guimier</SelectItem>
                                                    <SelectItem value="Jesse Owens">Jesse Owens</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                    <Button onClick={() => remove(index)} type="button" variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4 text-black" />
                                    </Button>
                                </div>
                            ))}
                            <Button onClick={() => append({ day: 'Lundi', start: '', end: '', gym: 'Jean Guimier' })}>
                                Ajouter un entrainement
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {defaultValues ? "Modifier" : "Créer"}
                </Button>
            </form>
        </Form>
    )
}
