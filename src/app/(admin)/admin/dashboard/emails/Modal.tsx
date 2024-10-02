import { Box, Button, TextField, InputLabel } from "@mui/material";
import { useState, ReactElement } from "react";
import useSendEmail from "@/utils/hooks/useSendEmail";
import Layout from "@/components/layouts/email";
import { TDatabase } from "@/utils/types";


type PropsType = {
    members: TDatabase.Member[];
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const subject = formData.get("subject") as string;
        const text = formData.get("text") as string;
        setPayload({ ...payload, subject, text });
        setStep(2);
    };
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        className="bg-primary min-h-96 min-w-[500px] p-6 rounded-lg"
      >
        <Box className="flex flex-col justify-center items-center gap-5">
          <InputLabel htmlFor="subject-input" className="text-black text-center">
            Sujet
          </InputLabel>
          <TextField
            id="subject-input"
            name="subject"
            variant="outlined"
            fullWidth
            defaultValue={payload.subject}
            className="bg-white rounded-md"
          />
          <InputLabel htmlFor="message-input" className="text-black text-center">
            Message
          </InputLabel>
          <TextField
            id="message-input"
            name="text"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            defaultValue={payload.text}
            className="bg-white rounded-md"
          />
          <Button variant="contained" color="primary" type="submit" className="mt-4">
            Soumettre
          </Button>
        </Box>
      </Box>
    );
  };
  

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