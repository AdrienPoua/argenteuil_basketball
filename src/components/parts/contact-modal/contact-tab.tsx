"use client"
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ContactForm from "@/components/forms/contact-form";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import club from "@/core/shared/config/club";

type PropsType = {
    setOpen: (open: boolean) => void
}

export function ContactTab({ setOpen }: PropsType) {
    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const onSuccess = () => {
        setOpen(false)
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 9000)
        toast.success("Message envoyé avec succès")
    }
    const onError = () => {
        setError(true)
        setTimeout(() => {
            setOpen(false)
            setError(false)
        }, 9000)
        toast.error("Une erreur est survenue lors de l'envoi du message")
    }
    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-primary flex items-center gap-2 text-xl">
                    <Mail className="text-primary h-5 w-5" />
                    Contactez-nous
                </DialogTitle>
                <DialogDescription className="mb-4">Une question ? Une demande ? Nous sommes là pour vous aider !</DialogDescription>
            </DialogHeader>
            <ContactForm onSuccess={onSuccess} onError={onError} error={error} success={success} />
            <DialogFooter className="flex-col space-y-4 sm:space-y-4">
                <div className="bg-muted/30 mx-auto rounded-lg p-4">
                    <p className="text-muted-foreground mb-2 text-sm">Autres moyens de contact :</p>
                    <div className="space-y-2">
                        <Link className="text-primary hover:text-primary/80 flex items-center justify-center gap-2 text-sm font-medium transition-colors" href={`mailto:${club.contact.email}`}>
                            <Mail className="h-4 w-4" />
                            {club.contact.email}
                        </Link>
                        <Link className="text-primary hover:text-primary/80 flex items-center justify-center gap-2 text-sm font-medium transition-colors" href={`tel:${club.contact.phone}`}>
                            <Phone className="h-4 w-4" />
                            {club.contact.phone}
                        </Link>
                    </div>
                </div>
            </DialogFooter>
        </>
    )
}
