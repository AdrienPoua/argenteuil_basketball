"use client";
import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

type PropsType = {
    children: React.ReactNode;
};

export default function Index({ children }: Readonly<PropsType>): ReactElement {
    const { data: clientSession, status } = useSession();

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
