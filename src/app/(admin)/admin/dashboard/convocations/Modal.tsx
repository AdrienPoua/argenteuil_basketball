"use client"
import { Match } from "@/utils/models";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState, ReactElement } from "react";
import { SentMessageInfo } from "nodemailer";
import { sendEmail } from "@/utils/serverActions";

type PropsType = {
    matchs: Match[]
    email: { sujet: string, message: string }
}

export default function Index({ matchs, email }: Readonly<PropsType>): ReactElement {
    const [result, setResult] = useState<SentMessageInfo | null>(null);
    const [disabled, setDisabled] = useState(false);

    const handleClick = async () => {
        const to = matchs.length === 1 ? matchs[0].correspondant : undefined
        const subject = email.sujet
        const text = email.message;
        try {
            setDisabled(true);
            const res = await sendEmail({ to, subject, text, bcc: "convocation@basket95.com" });
            console.log(res)
            setResult(res);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
        } finally {
            setDisabled(false);
        }
    }

    if (result) {
        return (
            <Box className="min-size-96 p-20 gap-5 flex flex-col justify-center items-center bg-white">
                {result.rejected.length === 0 ? (
                    <Typography className="text-black mb-1"> Tous les emails sont bien partis. </Typography>) : (
                    <Box>
                        <Typography className="text-black mb-1">
                            Les correspondants suivants ont bien reçu l&apos;email :
                        </Typography>
                        {result.accepted.map((email: string) => (
                            <Typography key={email} className="text-black">
                                {email}
                            </Typography>
                        ))}
                        <Typography className="text-black mt-5">
                            Les correspondants suivants n&apos;ont pas reçu l&apos;email :
                        </Typography>
                        {result.rejected.map((email: string) => (
                            <Typography key={email} className="text-black">
                                {email}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
        );
    }

    return (
        <Box className="min-size-96 p-20 gap-5 flex flex-col justify-center items-center bg-white">
            <Typography className="text-black" > Vous vous appretez a envoyer une convocation aux adresse suivantes : </Typography>
            {!disabled && matchs.map((match) => <Typography className="text-black" key={match.matchNumber}>{match.correspondant}</Typography>)}
            {!disabled ? <Button variant="contained" onClick={handleClick}> Oui je suis sur </Button> : <CircularProgress />}
        </Box>
    )
}

