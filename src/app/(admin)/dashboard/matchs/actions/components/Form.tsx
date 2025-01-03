"use client"

import { PropsType, FormValues } from "../../types/form.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { updateMatch } from "../server.actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "../../schemas/form.schema"

export default function MatchForm({ match, setIsEditing }: Readonly<PropsType>) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: match.date,
            time: match.time,
            salle: match.salle ?? ''
        }
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await updateMatch({
                ...match,
                ...data,
                salle: data.salle || null,
            });
            setIsEditing(false);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date du match</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="date" 
                                        {...field} 
                                        placeholder="Sélectionnez une date"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Heure du match</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="time" 
                                        {...field} 
                                        placeholder="Sélectionnez une heure"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="salle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salle</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    placeholder="Entrez le nom de la salle"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                    >
                        Annuler
                    </Button>
                    <Button type="submit">
                        Sauvegarder
                    </Button>
                </div>
            </form>
        </Form>
    )
} 