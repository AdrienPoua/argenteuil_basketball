"use client";

import { Box, Typography, Button, CircularProgress, List, ListItem } from "@mui/material";
import { ReactElement } from "react";

type PropsType = {
    emails: string[]
    sending: boolean
    sent: boolean
    children: ReactElement
}
const modalClass = "min-size-96 p-20 gap-5 flex flex-col justify-center items-center bg-white"

export default function Index({ emails, sending, sent, children }: Readonly<PropsType>): ReactElement {
    if (sending) {
        return (
            <Box className={modalClass}>
                <CircularProgress />
            </Box>
        );
    }
    if (sent) {
        return (
            <Box className={modalClass}>
                <Typography className="text-black mb-1">Tous les emails sont bien partis.</Typography>
            </Box>
        );
    }
    return (
        <Box className={modalClass}>
            <Typography className="text-black">Vous vous apprêtez à envoyer un email aux adresses suivantes :</Typography>
            <List>
                {emails.map((email, index) => (
                    <ListItem key={email + index}>
                        <Typography className="text-black">{email}</Typography>
                    </ListItem>
                ))}
            </List>
            {children}
        </Box>
    );
}
