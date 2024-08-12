"use client";

import { Match } from "@/utils/models";
import { useState, ReactElement } from "react";
import { Convocation as Template } from '@/lib/react-email/templates';
import { render } from '@react-email/components';
import { send } from "@/lib/nodemailer/utils";
import EmailModal from "@/components/EmailModal";

type PropsType = {
    matchs: Match[],
    isChecked: boolean,
    setSelectedMatch: (match: Match[]) => void
}

export default function Index({ matchs, isChecked, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const emails = matchs.map((match) => match.correspondant)
    const handleClick = async (): Promise<void> => {
        try {
            setSending(true);
            await Promise.all(
                matchs.map(async (match) => {
                    const html = render(<Template match={match} isModif={isChecked} />);
                    const subject = `Convocation pour le match n°${match.matchNumber} en ${match.division}`;
                    await send({ to: match.correspondant, subject, html });
                    setSent(true);
                })
            );
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
            throw new Error("Erreur lors de l'envoi de l'email");
        } finally {
            setSending(false);
            setSelectedMatch([]);
        }
    };
    return (
        <EmailModal handleClick={handleClick} emails={emails} sending={sending} sent={sent} />
    )

}
