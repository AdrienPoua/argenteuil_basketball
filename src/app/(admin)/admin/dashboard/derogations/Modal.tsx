"use client";

import { ReactElement, useState, Dispatch, SetStateAction } from "react";
import { Box, Typography, Button } from "@mui/material";
import { render } from '@react-email/components';

import { Match } from "@/utils/models";
import { sendEmail } from "@/utils/serverActions";
import { Derogation } from '@/lib/react-email/templates';

type PropsType = {
    match: Match,
    reason: string,
    proposition: string,
    setSelectedMatch: Dispatch<SetStateAction<Match | null>>
}

export default function Index({ match, reason, proposition, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const [res, setRes] = useState<{ rejected: string[]; accepted: string[] }>({ rejected: [], accepted: [] });
    const sent = res.accepted.length > 0 || res.rejected.length > 0
    const someReject = res.rejected.length > 0

    const handleClick = async (): Promise<void> => {
        try {
            const html = render(<Derogation match={match} reason={reason} proposition={proposition} />);
            const { correspondant, matchNumber } = match;
            const subject = `Demande de dérogation pour le match n°${matchNumber} en ${match.division}`;
            const res = await sendEmail({ to: correspondant, subject, html });
            setRes((prev) => ({
                rejected: [...prev.rejected, ...res.rejected],
                accepted: [...prev.accepted, ...res.accepted],
            }));
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
        } finally {
            setSelectedMatch(null);
        }
    };

    if (sent) {
        return (
            <Box className="min-size-96 p-20 gap-5 flex flex-col justify-center items-center bg-white">
                {!someReject ? (
                    <Typography className="text-black mb-1">Email envoyé</Typography>
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
            <Typography className="text-black" key={match.matchNumber}>{match.correspondant}</Typography>
            <Button variant="contained" onClick={handleClick}>
                Oui, je suis sûr
            </Button>
        </Box>
    );
}
