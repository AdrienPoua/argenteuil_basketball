'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Underline from '@/components/UnderlineDecorator'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { z } from "zod"
import Member from "@/models/Member"
import { SessionSchema, Gymnases, Days } from "@/database/schemas/Team"
import { createTeam } from "../actions/server.actions"
import { getImageUrl } from "../actions/client.actions"

export const formSchema = z.object({
    name: z.string(),
    image: z.instanceof(File).optional(),
    level: z.string(),
    sessions: z.array(SessionSchema),
    coach: z.string().optional()
});

type PropsType = {
    members: ReturnType<Member["toPlainObject"]>[]
}

export default function ZodForm({ members }: Readonly<PropsType>) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sessions: [],
            name: "",
            image: undefined,
            level: "",
            coach: undefined
        },
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'sessions'
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const imageUrl = data.image && await getImageUrl(data.image);
        await createTeam({ ...data, image: imageUrl })
        form.reset()
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
                                name="coach"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Entraineur</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger className="text-background">
                                                    <SelectValue placeholder="Selectionne un entraineur" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {members.map(member => (
                                                        <SelectItem key={member.id} value={member.id} className="text-background">
                                                            {member.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem className="text-background">
                                        <FormLabel>Niveau</FormLabel>
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
                                                onValueChange={(value: Days) => form.setValue(`sessions.${index}.day`, value)}
                                            >
                                                <SelectTrigger id={`day-${index}`} className="text-background">
                                                    <SelectValue placeholder="Selectionne un jour" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => <SelectItem key={day} value={day}>{day}</SelectItem>)}
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
                                                value={form.watch(`sessions.${index}.start`)}
                                                onChange={(e) => form.setValue(`sessions.${index}.start`, e.target.value)}
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
                                                value={form.watch(`sessions.${index}.end`)}
                                                onChange={(e) => form.setValue(`sessions.${index}.end`, e.target.value)}
                                                required
                                                className="text-black w-full"
                                            />
                                        </FormControl>
                                    </FormItem>
                                    <FormItem className="flex flex-col gap-3">
                                        <FormLabel htmlFor={`gym-${index}`}>Gymnase</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value: Gymnases) => form.setValue(`sessions.${index}.gymnase`, value)}
                                            >
                                                <SelectTrigger className="text-background" id={`gym-${index}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent >
                                                    <SelectItem value="Jean_Guimier">Jean Guimier</SelectItem>
                                                    <SelectItem value="Jesse_Owens">Jesse Owens</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                    <Button onClick={() => remove(index)} type="button" variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4 text-black" />
                                    </Button>
                                </div>
                            ))}
                            <Button onClick={() => append({ day: 'Lundi', start: '', end: '', gymnase: "Jean_Guimier" })}>
                                Ajouter un entrainement
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Envoi..." : "Envoyer"}
                </Button>
            </form>
        </Form >
    )
}
