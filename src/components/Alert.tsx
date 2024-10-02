"use client";
import { useAlert } from "@/utils/contexts/Alerts";
import { useEffect } from "react";
import { RocketIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons"


import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function AlertComponent() {
    const { open, setOpen, message, variant } = useAlert();

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false); // Fermer l'alerte après 3 secondes
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, setOpen]);

    return (
        <Alert className={`bottom-20 left-1/2 transform -translate-x-1/2 w-fit ${!open ? 'hidden' : 'fixed'}`}>
            {variant === "success" ?
                <RocketIcon className="h-4 w-4" /> : <ExclamationTriangleIcon className="h-4 w-4" />}
            <AlertTitle>
                {variant === "success" ?
                    "Bravo" : "Attention erreur"}
            </AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    )
}
