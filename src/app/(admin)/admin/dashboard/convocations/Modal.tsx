"use client";

import { Match } from "@/utils/models";
import { ReactElement } from "react";
import { Button } from "@mui/material";
import { Convocation as Template } from '@/lib/react-email/templates';
import { render } from '@react-email/components';
import Layout from "@/utils/layouts/email";
import useSendEmail from "@/utils/hooks/useSendEmail";
import useOpponentEmail from "@/utils/hooks/useOpponentEmail";
type PropsType = {
    matchs: Match[],
    isChecked: boolean,
    setSelectedMatch: (match: Match[]) => void
}

export default function Index({ matchs, isChecked, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const { sendEmail, sending, sent } = useSendEmail();
    const { emails, isLoading } = useOpponentEmail(matchs)
    
    const handleClick = async (): Promise<void> => {
        matchs.map(async (match, i) => {
            const to = emails[i]
            const html = render(<Template match={match} isModif={isChecked} />);
            const subject = `Convocation pour le match n°${match.matchNumber} en ${match.division}`;
            await sendEmail({ to, subject, html, bcc: match.division.toLocaleLowerCase() === "dm3" ? ["convocation@basket95.com", "sportive@basket95.com"] : ["convocation@basket95.com"] });
            setSelectedMatch([]);
        })
    }
    return (
        <Layout emails={emails} sending={sending} sent={sent} >
            <Button variant="contained" onClick={handleClick} disabled={isLoading} >
                Oui, je suis sûr
            </Button>
        </Layout>
    )

}
