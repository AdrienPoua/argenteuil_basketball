"use server";
import { SentMessageInfo } from "nodemailer";
import { Email, SingleTargetHtmlPayload, MultipleTargetPayload } from "@/lib/nodemailer/class";

export type PayloadType = {
  to?: string;
  subject: string;
  html?: string;
  bcc?: string[];
  text?: string;
}

export async function send({
  to,
  subject,
  html,
  bcc,
  text,
}: PayloadType): Promise<SentMessageInfo> {
  const email = createEmail({ to, subject, html, bcc, text });
  try {
    return await email.send();
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de l'email");
  }
}

function createEmail({ to, subject, html, bcc, text }: PayloadType): Email {
  if (bcc === undefined && html && to) {
    // Cas où l'on envoie un email avec HTML à un seul destinataire
    return new Email(new SingleTargetHtmlPayload({ to, subject, html }));
  } else if (bcc && text) {
    // Cas où l'on envoie un email texte à plusieurs destinataires
    return new Email(new MultipleTargetPayload({ subject, text, bcc }));
  } else {
    throw new Error(" invalide : spécifiez correctement les propriétés nécessaires.");
  }
}