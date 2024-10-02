import { createContext, useState, useContext, useMemo } from "react";
import { AlertComponent } from "@/components/Alert";

type setAlertType = {
    setOpen: (open: boolean) => void;
    setVariant: (variant: string) => void;
    setMessage: (message: string) => void;
    open: boolean;
    variant: string;
    message: string;
};

export const Context = createContext<setAlertType | null>(null);

export const useAlert = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useContext must be used within a Provider");
    }
    return context;
};

export function AlertProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState("error");
    const [message, setMessage] = useState("Echec de votre action !");

    const value = useMemo(() => ({ open, setOpen, variant, message, setVariant, setMessage }), [open, setOpen, variant, message, setVariant, setMessage]); // Add state setters to dependency array

    return (
        <Context.Provider value={value}>
            <AlertComponent />
            {children}
        </Context.Provider>
    );
}