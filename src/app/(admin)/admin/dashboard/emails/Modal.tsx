import { Box, Button, TextField } from "@mui/material";
import { useState, ReactElement } from "react";
import { DBMemberType } from "@/utils/types";
import useSendEmail from "@/utils/hooks/useSendEmail";
import Layout from "@/utils/layouts/email";

type PropsType = {
    members: DBMemberType[];
};

type PayloadType = {
    text: string,
    subject: string,
    bcc: string[]
}
type firstStepProps = {
    payload: PayloadType,
    setPayload: React.Dispatch<React.SetStateAction<PayloadType>>,
    setStep: (step: number) => void
}
export default function EmailForm({ members }: Readonly<PropsType>): ReactElement {
    const [step, setStep] = useState(1);
    const [payload, setPayload] = useState<PayloadType>({
        text: "",
        subject: "",
        bcc: members.map(member => member.email)
    });

    if (step === 1) {
        return <FirstStep setPayload={setPayload} payload={payload} setStep={setStep} />
    }

    if (step === 2) {
        return <SecondStep payload={payload} />
    }

    return <></>

}


const FirstStep = ({ payload, setPayload, setStep }: Readonly<firstStepProps>): ReactElement => {
    return (
        <Box className="bg-red-500 min-size-96 min-w-[500px] p-4">
            <Box className="flex flex-col justify-center items-center gap-5 grow">
                <TextField
                    label="Sujet du mail"
                    variant="outlined"
                    value={payload.subject}
                    onChange={(e) => setPayload({ ...payload, subject: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Entrez votre message ici"
                    multiline
                    rows={10}
                    variant="outlined"
                    value={payload.text}
                    onChange={(e) => setPayload({ ...payload, text: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={() => setStep(2)} variant="contained" color="primary">
                    Soumettre
                </Button>
            </Box>
        </Box>
    );
}

const SecondStep = ({ payload }: Readonly<{ payload: PayloadType }>): ReactElement => {
    const { sendEmail, sending, sent } = useSendEmail();
    const handleClick = async (): Promise<void> => {
        await sendEmail(payload);
    }
    return (
        <Layout emails={payload.bcc} sending={sending} sent={sent} >
            <Button variant="contained" onClick={handleClick}>
                Oui, je suis sûr
            </Button>
        </Layout>
    )
}