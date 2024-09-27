"use client";
import { useAlert } from "@/utils/contexts/Alerts";
import { Alert } from "@mui/material";
import { useEffect } from "react";

export function AlertComponent() {
    const { open, setOpen, severity, message } = useAlert();

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false); // Fermer l'alerte après 3 secondes
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, setOpen]);

    return (
        <div className="fixed bottom-20 left-0 right-0 flex flex-col items-center gap-4">
            {open && (
                <Alert severity={severity as "success" | "info" | "warning" | "error"} onClose={() => setOpen(false)}>
                    {message}
                </Alert>
            )}
        </div>
    );
}   