import { useState } from "react";
import { send } from "@/lib/nodemailer/utils";
import { PayloadType } from "@/lib/nodemailer/utils";

export default function useSendEmail() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const sendEmail = async (payload: PayloadType): Promise<void> => {
    setSending(true);
    setSent(false);
    setError(null);
    try {
      setSending(true);
      await send(payload);
      setSent(true);
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'email:", err);
      setError("Erreur lors de l'envoi de l'email");
      throw err;
    } finally {
      setSending(false);
    }
  };

  return { sending, sent, error, sendEmail };
}
