'use client'

import { useState } from 'react'
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
import { createStaff } from '@/lib/mongo/controllers/staff'
import { useQueryClient } from "react-query";



type FormValues = z.infer<typeof formSchema>
interface ZodFormProps {
    defaultValues?: Partial<FormValues>
}

export default function Ztest({ defaultValues }: Readonly<ZodFormProps>) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const queryClient = useQueryClient()
    const resetForm = () => {
        queryClient.invalidateQueries(["staff"]);
        form.reset()
        setIsSubmitting(false)
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            email: defaultValues?.email ?? '',
            number: defaultValues?.number ?? '',
            teams: defaultValues?.teams ?? [],
            job: defaultValues?.job ?? '',
            image: defaultValues?.image ?? undefined,
            isEmailDisplayed: defaultValues?.isEmailDisplayed ?? false,
            isNumberDisplayed: defaultValues?.isNumberDisplayed ?? false,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'teams',
    });



    async function onSubmit(data: FormValues) {
        setIsSubmitting(true)
        try {
            if (data.image) {
                const imageUrl: string | undefined = await uploadImage(data.image as File)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-md mx-auto bg-foreground border border-primary/50 rounded-xl p-3 font-secondary ">
                <FormField
                    control={form.control}
                    name="teams"
                    render={() => (
                        <FormItem className="text-background flex flex-col gap-2">
                            <FormLabel>Équipes</FormLabel>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-3 items-center">
                                    <FormControl>
                                        <Input
                                            placeholder={`Équipe ${index + 1}`}
                                            {...form.register(`teams.${index}` as const)}  // Correct registration of each team input
                                        />
                                    </FormControl>
                                    <Button
                                        onClick={() => remove(index)}  // Remove team
                                        type="button"
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            ))}
                            <Button
                                onClick={() => append('')}  // Add new team
                                type="button"
                            >
                                Ajouter une équipe
                            </Button>
                            <FormDescription>Ce champ est optionnel</FormDescription>
                            <FormMessage />
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





function App() {
    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            email: defaultValues?.email ?? '',
            number: defaultValues?.number ?? '',
            teams: defaultValues?.teams ?? [],
            job: defaultValues?.job ?? '',
            image: defaultValues?.image ?? undefined,
            isEmailDisplayed: defaultValues?.isEmailDisplayed ?? false,
            isNumberDisplayed: defaultValues?.isNumberDisplayed ?? false,
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
    });

    return (
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <ul>
                {fields.map((item, index) => (
                    <li key={item.id}>
                        <input {...register(`test.${index}.firstName`)} />
                        <FormField
                            render={({ field }) => <input {...field} />}
                            name={`test.${index}.lastName`}
                            control={control}
                        />
                        <button type="button" onClick={() => remove(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick={() => append({ firstName: "bill", lastName: "luo" })}
            >
                append
            </button>
            <input type="submit" />
        </form>
    );
}