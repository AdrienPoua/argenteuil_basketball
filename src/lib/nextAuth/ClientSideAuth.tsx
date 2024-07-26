"use client";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

type PropsType = {
    children: React.ReactNode;
};

export default function Index({ children }: Readonly<PropsType>): null | ReactElement {
    const { data: clientSession, status } = useSession();

    // Si le composant est rendu côté serveur, retourner null
    if (typeof window === "undefined") {
        return null;
    }

    if (status === "loading") {
        return (
            <Box className="flex justify-center items-center h-screen w-full">
                <CircularProgress />
            </Box>
        );
    }

    if (clientSession) {
        return <>{children}</>;
    }

    return (
        <Box className="flex justify-center items-center h-screen w-full">
            <Typography className="text-black text-6xl">Access Denied</Typography>
        </Box>
    );
}
