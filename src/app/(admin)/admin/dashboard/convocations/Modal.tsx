"use client";

import { Match } from "@/utils/models";
import { ReactElement } from "react";
import { Button } from "@mui/material";
import { Convocation as Template } from '@/lib/react-email/templates';
import { render } from '@react-email/components';
import Layout from "@/utils/layouts/email";
import useSendEmail from "@/utils/hooks/useSendEmail";
type PropsType = {
    matchs: Match[],
    isChecked: boolean,
    setSelectedMatch: (match: Match[]) => void
}

export default function Index({ matchs, isChecked, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const emails = matchs.map((match) => match.correspondant)
    const { sendEmail, sending, sent } = useSendEmail();

    const handleClick = async (): Promise<void> => {
        matchs.map(async (match) => {
            const html = render(<Template match={match} isModif={isChecked} />);
            const subject = `Convocation pour le match n°${match.matchNumber} en ${match.division}`;
            await sendEmail({ to: match.correspondant, subject, html });
            setSelectedMatch([]);
        })
    }
    return (
        <Layout emails={emails} sending={sending} sent={sent} >
            <Button variant="contained" onClick={handleClick}>
                Oui, je suis sûr
            </Button>
        </Layout>
    )

}
