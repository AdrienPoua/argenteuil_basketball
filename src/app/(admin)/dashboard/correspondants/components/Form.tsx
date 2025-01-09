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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Phone } from 'lucide-react'

export default function ClubForm({ defaultValues, setIsEditing }: Readonly<PropsType>) {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">
                            {defaultValues ? "Modifier le club" : "Créer un nouveau club"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="libelle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du club</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input className="pl-10" placeholder="Cergy" {...field} />
                                        </div>
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
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                className="pl-10"
                                                type="tel"
                                                placeholder="06 12 34 56 78"
                                                {...field}
                                            />
                                        </div>
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
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                className="pl-10"
                                                type="email"
                                                placeholder="contact@cergy.fr"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {defaultValues ? "Modifier le club" : "Créer le club"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

