"use client";

import { ReactElement, Dispatch, SetStateAction } from "react";
import { render } from '@react-email/components';
import { Match } from "@/utils/models";
import { Derogation as Template } from '@/lib/react-email/templates';
import useSendEmail from "@/utils/hooks/useSendEmail";
import Layout from "@/utils/layouts/email";
import { Button } from "@mui/material";
type PropsType = {
    match: Match,
    reason: string,
    proposition: string,
    setSelectedMatch: Dispatch<SetStateAction<Match | null>>
}

export default function Index({ match, reason, proposition, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const { sendEmail, sending, sent } = useSendEmail();
    const email = [match.correspondant]

    const handleClick = async (): Promise<void> => {
        const html = render(<Template match={match} reason={reason} proposition={proposition} />);
        const subject = `Demande de dérogation pour le match n°${match.matchNumber} en ${match.division}`;
        await sendEmail({ to: match.correspondant, subject, html });
        setSelectedMatch(null);
    }
    return (
        <Layout emails={email} sending={sending} sent={sent} >
            <Button variant="contained" onClick={handleClick}>
                Oui, je suis sûr
            </Button>
        </Layout>
    )
};
