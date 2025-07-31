"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender, InscriptionEntity, TypeInscription } from "@/core/domain/entities/inscription.entity"

import { updateInscription } from "@/core//presentation/actions/inscriptions/updateInscription"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

type PropsType = {
    currentInscription: InscriptionEntity
    actions: {
        success: () => void
    }
}

export function InscriptionFormUpdate({ currentInscription, actions }: PropsType) {
    const formSchema = z.object({
        last_name: z.string().min(2, "Le nom est requis"),
        first_name: z.string().min(2, "Le prénom est requis"),
        email: z.string().email("Email invalide"),
        date_of_birth: z.string().min(8, "Date de naissance requise"),
        phone_number: z.string().min(8, "Téléphone requis"),
        gender: z.enum(["Masculin", "Féminin"]),
        surclassement: z.boolean().optional(),
        type_inscription: z.enum(["RENOUVELLEMENT", "MUTATION", "NOUVELLE_LICENCE", "RENOUVELLEMENT_SANS_MUTATION"]),
        status: z.enum(["EN_ATTENTE", "TRAITEE", "REJETEE"]),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            last_name: currentInscription.lastName,
            first_name: currentInscription.firstName,
            email: currentInscription.email,
            date_of_birth: currentInscription.dateOfBirth.toISOString().split('T')[0],
            phone_number: currentInscription.phoneNumber,
            gender: currentInscription.gender,
            surclassement: currentInscription.surclassement,
            type_inscription: currentInscription.typeInscription,
            status: currentInscription.status,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateInscription(currentInscription.id, values)
            actions.success()
            toast.success("Pré-inscription modifiée avec succès")
        } catch (error) {
            const normalizedError = ErrorHandler.normalize(error)
            ErrorHandler.log(normalizedError)
            toast.error(ErrorHandler.userMessage(error))
        }
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-2">
                    <FormField control={form.control} name="last_name" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Nom</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="first_name" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Prénom</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="date_of_birth" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select onValueChange={(value) => field.onChange(value as Gender)} value={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Choisir un genre" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Masculin">Masculin</SelectItem>
                                <SelectItem value="Féminin">Féminin</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone_number" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl><Input type="tel" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="type_inscription" render={({ field }) => (
                    <FormItem>
                            <FormLabel>Type d&apos;inscription</FormLabel>
                        <Select onValueChange={(value) => field.onChange(value as TypeInscription)} value={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Choisir un type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value={"RENOUVELLEMENT"}>Renouvellement : J&apos;étais au club la saison dernière</SelectItem>
                                <SelectItem value={"MUTATION"}>Mutation : J&apos;étais dans un autre club la saison dernière</SelectItem>
                                <SelectItem value={"NOUVELLE_LICENCE"}>Nouvelle licence : Je n&apos;ai jamais eu de licence en club</SelectItem>
                                <SelectItem value={"RENOUVELLEMENT_SANS_MUTATION"}>Renouvellement sans mutation : J&apos;ai déjà eu une licence, mais pas l&apos;année dernière</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Statut</FormLabel>
                        <Select onValueChange={(value) => field.onChange(value)} value={field.value !== undefined ? String(field.value) : ""}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Choisir un statut" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value={"EN_ATTENTE"}>En attente</SelectItem>
                                <SelectItem value={"TRAITEE"}>Traitée</SelectItem>
                                <SelectItem value={"REJETEE"}>Refusée</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="surclassement" render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Surclassement</FormLabel>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={actions.success}>
                        Annuler
                    </Button>
                    <Button type="submit">
                        Modifier la pré-inscription
                    </Button>
                </div>
            </form>
        </Form>
    )
} 