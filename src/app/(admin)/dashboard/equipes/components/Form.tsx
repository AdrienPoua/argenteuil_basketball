'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Underline from '@/components/UnderlineDecorator'
import { useFieldArray } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Trash2, Plus, Upload } from 'lucide-react'
import { useState } from "react"
import Image from "next/image"
import { Gymnases, Days } from "@/database/schemas/Team"
import { createTeam, updateTeam } from "../actions/server.actions"
import { getImageUrl, useCompetitions, useTeamForm } from "../actions/client.actions"
import { FormSchemaType, PropsType } from "../types/form.types"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelect } from "@/components/ui/multi-select"

export default function EnhancedForm({ members, defaultValues, setIsEditing }: Readonly<PropsType>) {
    const form = useTeamForm(defaultValues)
    const championnats = useCompetitions()
    const [previewImage, setPreviewImage] = useState<string | null>(defaultValues?.image ?? null)
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'sessions'
    });

    if (!championnats) return <div>Chargement...</div>

    async function onSubmit(data: FormSchemaType) {
        const imageDidntChange = defaultValues?.image && data.image?.name === defaultValues.image
        const imageUrl = imageDidntChange ? defaultValues?.image : (data.image && await getImageUrl(data.image)) ?? null;
        if (defaultValues) {
            await updateTeam({ ...data, image: imageUrl, id: defaultValues.id })
        } else {
            await createTeam({ ...data, image: imageUrl })
        }
        form.reset()
        setIsEditing && setIsEditing(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data"
                className="max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary">
                                Informations de l&apos;équipe <Underline />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Nom de l&apos;équipe</FormLabel>
                                        <FormControl >
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
                                    <FormItem>
                                        <FormLabel className="text-background">Image de l&apos;équipe</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-col items-center space-y-4">
                                                {previewImage && (
                                                    <div className="relative w-full h-48 rounded-md overflow-hidden">
                                                        <Image src={previewImage} alt="Prévisualisation" layout="fill" objectFit="cover" />
                                                    </div>
                                                )}
                                                <label className="w-full">
                                                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                                        <div className="space-y-1 text-center">
                                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="relative font-medium text-primary hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                                                    Télécharger une image
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const url = URL.createObjectURL(file);
                                                                    field.onChange(file);
                                                                    setPreviewImage(url);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </label>
                                            </div>
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
                                        <FormLabel className="text-background">Entraineur</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <FormControl  className="text-background">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un entraineur" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {members
                                                    .toSorted((a, b) => a.name.localeCompare(b.name))
                                                    .map(member => (
                                                        <SelectItem key={member.id} value={member.id} className="text-background">
                                                            {member.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-background">Niveau</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Départementale" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isCompetition"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked)}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-background">
                                                Équipe en compétition
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="championnats"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Championnats</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                options={championnats.map(championnat => ({
                                                    label: championnat,
                                                    value: championnat,
                                                }))}
                                                selected={field.value}
                                                onChange={(values) => {
                                                    field.onChange(values)
                                                }}
                                                placeholder="Sélectionner les championnats"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary text-center mb-5">
                                Horaires d&apos;entrainements <Underline />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 bg-muted rounded-lg space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormItem>
                                            <FormLabel htmlFor={`day-${index}`} className="text-background">Jour</FormLabel>
                                            <Select
                                                onValueChange={(value: Days) => form.setValue(`sessions.${index}.day`, value)}
                                            >
                                                <FormControl>
                                                    <SelectTrigger id={`day-${index}`}>
                                                        <SelectValue placeholder="Sélectionner un jour" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
                                                        <SelectItem key={day} value={day}>{day}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel htmlFor={`gym-${index}`} className="text-background">Gymnase</FormLabel>
                                            <Select
                                                onValueChange={(value: Gymnases) => form.setValue(`sessions.${index}.gymnase`, value)}
                                                defaultValue="Jean_Guimier"
                                            >
                                                <FormControl>
                                                    <SelectTrigger id={`gym-${index}`}>
                                                        <SelectValue placeholder="Sélectionner un gymnase"  />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Jean_Guimier">Jean Guimier</SelectItem>
                                                    <SelectItem value="Jesse_Owens">Jesse Owens</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormItem>
                                            <FormLabel htmlFor={`start-${index}`}>Début</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    id={`start-${index}`}
                                                    value={form.watch(`sessions.${index}.start`)}
                                                    onChange={(e) => form.setValue(`sessions.${index}.start`, e.target.value)}
                                                    required
                                                />
                                            </FormControl>
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel htmlFor={`end-${index}`}>Fin</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    id={`end-${index}`}
                                                    value={form.watch(`sessions.${index}.end`)}
                                                    onChange={(e) => form.setValue(`sessions.${index}.end`, e.target.value)}
                                                    required
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </div>
                                    <Button
                                        onClick={() => remove(index)}
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="w-full mt-2"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Supprimer cette session
                                    </Button>
                                </div>
                            ))}
                            <Button
                                onClick={() => append({ day: 'Lundi', start: '', end: '', gymnase: "Jean_Guimier" })}
                                type="button"
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter un entrainement
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Button type="submit" className="w-full mt-8" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Envoi en cours..." : "Enregistrer l'équipe"}
                </Button>
            </form>
        </Form>
    )
}

