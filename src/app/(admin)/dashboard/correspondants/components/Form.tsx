"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateClub } from "../actions/server.actions"
import { FormValues, PropsType } from "../types/form.types"
import { useClubForm } from "../actions/client.actions"

export default function ClubForm({ defaultValues, setIsEditing }: Readonly<PropsType>) {
    console.log("🚀 ~ ClubForm ~ defaultValues:", defaultValues)
    const form = useClubForm(defaultValues)
    async function onSubmit(data: FormValues) {
        try {
            await updateClub(data)
            setIsEditing(false)
            form.reset()
        } catch (error) {
            console.error("Erreur lors de la création du club :", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-foreground p-5 rounded-md font-secondary">
                <FormField
                    control={form.control}
                    name="libelle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom du club</FormLabel>
                            <FormControl>
                                <Input className="font-secondary" placeholder="Cergy" {...field} />
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
                                <Input
                                    type="tel"
                                    placeholder="06 12 34 56 78"
                                    {...field}
                                />
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
                                <Input
                                    type="email"
                                    placeholder="contact@cergy.fr"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {defaultValues ? "Modifier" : "Créer"}
                </Button>
            </form>
        </Form>
    )
}
