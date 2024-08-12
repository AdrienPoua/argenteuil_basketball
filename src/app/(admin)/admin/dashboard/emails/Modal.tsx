import { Box, Button, TextField } from "@mui/material";
import { useState, ReactElement } from "react";
import { DBMemberType } from "@/utils/types";
import { send } from "@/lib/nodemailer/utils";
import EmailModal from "@/components/EmailModal";

type PropsType = {
    members: DBMemberType[];
};

export default function EmailForm({ members }: Readonly<PropsType>): ReactElement {
    const [text, setText] = useState("");
    const [subject, setSubject] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [nextStep, setNextStep] = useState(false);
    const bcc = members.map(member => member.email)

    const handleClick = async () => {
        try {
            setSending(true);
            await send({ subject, text, bcc });
            setSent(true);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
            throw new Error("Erreur lors de l'envoi de l'email");
        } finally {
            setSending(false);
        }
    };

    if (nextStep) {
        return <EmailModal handleClick={handleClick} emails={bcc} sending={sending} sent={sent} />
    }


    return (
        <Box className="bg-red-500 min-size-96 min-w-[500px] p-4">
            <Box  className="flex flex-col justify-center items-center gap-5 grow">
                <TextField
                    label="Sujet du mail"
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Entrez votre message ici"
                    multiline
                    rows={10}
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={() => setNextStep(true)} variant="contained" color="primary" disabled={sending}>
                    Soumettre
                </Button>
            </Box>
        </Box>
    );
}
