"use client";
import { useAlert } from "@/utils/contexts/Alerts";
import { Alert } from "@mui/material";
import { createPortal } from "react-dom";

export function AlertComponent() {
    const { open, setOpen, severity, message } = useAlert();
    // Fonction pour gérer l'ouverture de l'alerte
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false); // Fermer l'alerte après 3 secondes
        }, 3000);
    };


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