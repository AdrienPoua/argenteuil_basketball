import { useState, ReactElement } from "react";
import useSendEmail from "@/utils/hooks/useSendEmail";
import { TDatabase } from "@/utils/types";
import { Button } from "@/components/ui/button"; // ShadCN UI button
import { Input } from "@/components/ui/input"; // ShadCN UI input
import { Textarea } from "@/components/ui/textarea"; // ShadCN UI textarea
import { Label } from "@/components/ui/label"; // ShadCN UI label

type PropsType = {
  members: TDatabase.Member[];
};

type PayloadType = {
  text: string;
  subject: string;
  bcc: string[];
};

type FirstStepProps = {
  payload: PayloadType;
  setPayload: React.Dispatch<React.SetStateAction<PayloadType>>;
  setStep: (step: number) => void;
};

export default function EmailForm({ members }: Readonly<PropsType>): ReactElement {
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState<PayloadType>({
    text: "",
    subject: "",
    bcc: members.map((member) => member.email),
  });

  if (step === 1) {
    return <FirstStep setPayload={setPayload} payload={payload} setStep={setStep} />;
  }

  if (step === 2) {
    return <SecondStep payload={payload} />;
  }

  return <></>;
}

const FirstStep = ({ payload, setPayload, setStep }: Readonly<FirstStepProps>): ReactElement => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const subject = formData.get("subject") as string;
    const text = formData.get("text") as string;
    setPayload({ ...payload, subject, text });
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary min-h-96 min-w-[500px] p-6 rounded-lg">
      <div className="flex flex-col justify-center items-center gap-5">
        {/* Subject Field */}
        <Label htmlFor="subject-input" className="text-black text-center">
          Sujet
        </Label>
        <Input
          id="subject-input"
          name="subject"
          defaultValue={payload.subject}
          className="bg-white rounded-md"
        />

        {/* Message Field */}
        <Label htmlFor="message-input" className="text-black text-center">
          Message
        </Label>
        <Textarea
          id="message-input"
          name="text"
          rows={10}
          defaultValue={payload.text}
          className="bg-white rounded-md"
        />

        {/* Submit Button */}
        <Button type="submit" className="mt-4">
          Soumettre
        </Button>
      </div>
    </form>
  );
};

const SecondStep = ({ payload }: Readonly<{ payload: PayloadType }>): ReactElement => {
  const { sendEmail, sending, sent } = useSendEmail();

  const handleClick = async (): Promise<void> => {
    await sendEmail(payload);
  };

  return (
    <Button onClick={handleClick} className="mt-4">
      Oui, je suis sûr
    </Button>
  );
};
