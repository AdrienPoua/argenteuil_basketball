"use client"
import { useState } from "react"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createFAQ } from "../actions/server.actions"
import { formSchema } from "../schemas/form.schema"
import { useFAQForm } from "../actions/client.action"
export default function FAQForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useFAQForm()
    
    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("🚀 ~ onSubmit ~ data:", data)
        setIsSubmitting(true)
        try {
            await createFAQ(data)
            form.reset()
        } catch (error) {
            console.error("Error creating FAQ:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-5">
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Votre question ici"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Réponse</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Votre réponse ici"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </Button>
            </form>
        </Form>
    )
}

