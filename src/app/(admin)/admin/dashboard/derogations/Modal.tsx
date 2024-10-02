"use client";

import { ReactElement, Dispatch, SetStateAction } from "react";
import { render } from '@react-email/components';
import { Match } from "@/utils/models";
import { Derogation as Template } from '@/lib/react-email/templates';
import useSendEmail from "@/utils/hooks/useSendEmail";
import Layout from "@/components/layouts/email";
import { Button } from "@mui/material";
import useOpponentEmail from "@/utils/hooks/useOpponentEmail";


type PropsType = {
    match: Match,
    reason: string,
    proposition: string,
    setSelectedMatch: Dispatch<SetStateAction<Match | null>>
}

export default function Index({ match, reason, proposition, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const { sendEmail, sending, sent } = useSendEmail();
    const { emails, isLoading } = useOpponentEmail([match])



    const handleClick = async (): Promise<void> => {
        const html = render(<Template match={match} reason={reason} proposition={proposition} />);
        const subject = `Demande de dérogation pour le match n°${match.matchNumber} en ${match.division}`;
        await sendEmail({ to: emails[0], subject, html, bcc: ["convocation@basket95.com", "sportive@basket95.com"] });
        setSelectedMatch(null);
    }
    return (
        <Layout emails={emails} sending={sending} sent={sent} >
            <Button variant="contained" onClick={handleClick} disabled={isLoading} >
                Oui, je suis sûr
            </Button>
        </Layout>
    )
};
