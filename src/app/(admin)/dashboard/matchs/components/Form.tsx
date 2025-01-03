"use client"

import { PropsType, FormValues } from "../types/form.types"
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
import { useMatchForm } from "../actions/client.action"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle } from "@/components/ui/card"

export default function MatchForm({ match, setIsEditing }: Readonly<PropsType>) {
    console.log("🚀 ~ MatchForm ~ match:", match)
    const form = useMatchForm(match);


    const onSubmit = async (data: FormValues) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        try {
            setIsEditing(false);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Badge variant="match">
                        {match.competition}
                    </Badge>
                    <CardHeader className="flex flex-row items-center justify-between mb-3">
                        <CardTitle className="text-lg w-full text-center mb">
                            Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button onClick={() => setIsEditing(true)}>
                                Modifier
                            </Button>
                        </div>
                    </CardHeader>
                </div>
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
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    <Button
                        type="button"
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