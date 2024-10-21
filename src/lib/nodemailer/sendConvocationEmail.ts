import { ConvocationEmail, Email } from "@/lib/nodemailer/class";
import { SentMessageInfo } from "nodemailer";

interface EmailPayload {
  email: string;
  subject: string;
  html: string;
}

const sendConvocationEmail = async ({
  email,
  subject,
  html,
}: EmailPayload): Promise<SentMessageInfo> => {
  const convocation = new ConvocationEmail({
    to: email,
    subject: subject,
    html: html,
  });
  return await convocation.send();
};

export default sendConvocationEmail;
