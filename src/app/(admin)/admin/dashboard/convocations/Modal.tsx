"use client";

import { Match } from "@/utils/models";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState, ReactElement } from "react";
import { sendEmail } from "@/utils/serverActions";
import { Convocation } from '@/lib/react-email/templates';
import { render } from '@react-email/components';

type PropsType = {
    matchs: Match[],
    email: { sujet: string, message: string },
    isChecked: boolean,
    setSelectedMatch: (match: Match[]) => void
}

export default function Index({ matchs, isChecked, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const [disabled, setDisabled] = useState(false);
    const [res, setRes] = useState<{ rejected: string[]; accepted: string[] }>({ rejected: [], accepted: [] });
    const sent = res.accepted.length > 0 || res.rejected.length > 0
    const someReject = res.rejected.length > 0

    const handleClick = async () => {
        try {
            setDisabled(true);
            await Promise.all(
                matchs.map(async (match) => {
                    const html = render(<Convocation match={match} isModif={isChecked} />);
                    const { correspondant, matchNumber } = match;
                    const subject = `Convocation pour le match n°${matchNumber} en ${match.division}`;
                    const res = await sendEmail({ to: correspondant, subject, html });
                    setRes((prev) => ({
                        rejected: [...prev.rejected, ...res.rejected],
                        accepted: [...prev.accepted, ...res.accepted],
                    }))
                })
            );
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
        } finally {
            setDisabled(false);
            setSelectedMatch([]);
        }
    };

    if (sent) {
        return (
            <Box className="min-size-96 p-20 gap-5 flex flex-col justify-center items-center bg-white">
                { !someReject ? (
                    <Typography className="text-black mb-1">Tous les emails sont bien partis.</Typography>
                ) : (
                    <Box>
                        <Typography className="text-black mb-1">
                            Les correspondants suivants ont bien reçu l&apos;email :
                        </Typography>
                        {res.accepted.map((email: string) => (
                            <Typography key={email} className="text-black">
                                {email}
                            </Typography>
                        ))}
                        <Typography className="text-black mt-5">
                            Les correspondants suivants n&apos;ont pas reçu l&apos;email :
                        </Typography>
                        {res.rejected.map((email: string) => (
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
            <Typography className="text-black">Vous vous apprêtez à envoyer une convocation aux adresses suivantes :</Typography>
            {!disabled && matchs.map((match) => (
                <Typography className="text-black" key={match.matchNumber}>{match.correspondant}</Typography>
            ))}
            {!disabled ? (
                <Button variant="contained" onClick={handleClick}>
                    Oui, je suis sûr
                </Button>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
}
