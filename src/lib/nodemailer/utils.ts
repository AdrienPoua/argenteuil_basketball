"use server";
import { SentMessageInfo } from "nodemailer";
import { Email, SingleTargetHtmlPayload, MultipleTargetHtmlPayload } from "@/lib/nodemailer/class";

export type PayloadType = {
  to?: string;
  subject: string;
  html?: string;
  bcc?: string[];
  text?: string;
};

export async function send({ to, subject, html, bcc, text }: PayloadType): Promise<SentMessageInfo> {
  const email = createEmail({ to, subject, html, bcc, text });
  console.log("🚀 ~ email:", email);
  try {
    return await email.send();
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de l'email: " + error);
  }
}

function createEmail({ to, subject, html, bcc, text }: PayloadType): Email {
  if (!bcc && html && to && subject) {
    // Cas où l'on envoie un email avec HTML à un seul destinataire
    const singleTargetHtmlPayload = new SingleTargetHtmlPayload({ to, subject, html });
    return new Email(singleTargetHtmlPayload);
  } else if (bcc && subject && html) {
    // Cas où l'on envoie un email texte à plusieurs destinataires
    const multipleTargetHtmlPayload = new MultipleTargetHtmlPayload({ subject, html, bcc });
    return new Email(multipleTargetHtmlPayload);
  } else {
    console.log("🚀 ~ createEmail ~ to, subject, html, bcc, text:", to, subject, html, bcc, text);
    throw new Error(" invalide : spécifiez correctement les propriétés nécessaires.");
  }
}
