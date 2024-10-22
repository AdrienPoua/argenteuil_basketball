"use server"; // Ensures this file is treated as a server component

import { SentMessageInfo } from "nodemailer";
import { Convocation, Email } from "@/lib/nodemailer/class"; // Assuming these imports are correct

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  division: string;
}

export default async function sendConvocation({
  to,
  subject,
  html,
  division,
}: EmailPayload): Promise<SentMessageInfo> {
  const convocation = new Convocation({
    to,
    subject,
    html,
    division,
  });

  const email = new Email(convocation);
  await email.send();
}
