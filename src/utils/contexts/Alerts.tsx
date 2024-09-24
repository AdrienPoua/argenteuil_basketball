import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { AlertComponent } from "@/components/Alert";

interface AlertContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    severity: string;
    message: string;
    setSeverity: Dispatch<SetStateAction<string>>;
    setMessage: Dispatch<SetStateAction<string>>;
    config: (open: boolean, severity: string, message: string) => void;
    setAlert: (open: boolean, severity: string, message: string) => void;
}

export const Context = createContext<AlertContextType | null>(null);

export const useAlert = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useContext must be used within a Provider");
    }
    return context;
};

export function AlertProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("Votre action a été réalisée avec succès !");
    const setAlert = (open: boolean, severity: string, message: string) => {
        setSeverity(severity);
        setMessage(message);
        setOpen(open);
    }
    const config = (open: boolean, severity: string, message: string) => {
        setAlert(open, severity, message);
    }
    const value = {
        open,
        setOpen,
        severity,
        setSeverity,
        message,
        setMessage,
        setAlert,
        config
    }

    return (
        <Context.Provider value={value}>
            <AlertComponent />
            {children}
        </Context.Provider>
    );
}
