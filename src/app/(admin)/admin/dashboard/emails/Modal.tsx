import { Box, Button, TextField, Typography } from "@mui/material";
import { SentMessageInfo } from "nodemailer";
import { useState, ReactElement, FormEvent } from "react";
import { DBMemberType } from "@/utils/types";
import { sendEmail } from "@/utils/serverActions";

type PropsType = {
    members: DBMemberType[];
};

export default function EmailForm({ members }: Readonly<PropsType>): ReactElement {
    const [emailBody, setEmailBody] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [result, setResult] = useState<SentMessageInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const emails = members.map(member => member.email).join(", ");

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await sendEmail({ subject: emailSubject, text: emailBody, bcc: emails });
            setResult(response);
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email:", error);
        } finally {
            setIsLoading(false);
        }
    };
    if (result) {
        return (
            <Box className="min-size-96 p-20 gap-5 flex flex-col justify-center items-center bg-white">
                {result.rejected.length === 0 ? (
                    <Typography className="text-black mb-1"> Tous les emails sont bien partis. </Typography>) : (
                    <Box>
                        <Typography className="text-black mb-1">
                            Les membres suivants ont bien reçu l&apos;email :
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
        <Box className="bg-red-500 min-size-96 min-w-[500px] p-4">
            <Box component="form" onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center gap-5 grow">
                <TextField
                    label="Sujet du mail"
                    variant="outlined"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Entrez votre message ici"
                    multiline
                    rows={10}
                    variant="outlined"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    Soumettre
                </Button>
            </Box>
        </Box>
    );
}
