"use client";

import { ReactElement, useState, Dispatch, SetStateAction } from "react";
import { render } from '@react-email/components';
import { Match } from "@/utils/models";
import { Derogation as Template } from '@/lib/react-email/templates';
import { send } from "@/lib/nodemailer/utils";
import EmailModal from "@/components/EmailModal";

type PropsType = {
    match: Match,
    reason: string,
    proposition: string,
    setSelectedMatch: Dispatch<SetStateAction<Match | null>>
}

export default function Index({ match, reason, proposition, setSelectedMatch }: Readonly<PropsType>): ReactElement {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const emails = [match.correspondant]
    const handleClick = async (): Promise<void> => {
        try {
            setSending(true);
            const html = render(<Template match={match} reason={reason} proposition={proposition} />);
            const subject = `Demande de dérogation pour le match n°${match.matchNumber} en ${match.division}`;
            await send({ to: match.correspondant, subject, html });
            setSent(true);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
            throw new Error("Erreur lors de l'envoi de l'email");
        } finally {
            setSending(false);
            setSelectedMatch(null);
        }
    };
    return (
        <EmailModal handleClick={handleClick} emails={emails} sending={sending} sent={sent} />
    )

}
