"use server";
import { transporter, clubEmail } from "@/lib/nodemailer";

export const sendEmail = async (to: string, subject: string, text: string, cc? : string) => {
  try {
    await transporter.sendMail({
      from: clubEmail,
      bcc : to,
      subject,
      text,
    });
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    return { success: false, message: "Erreur lors de l'envoi de l'email", error };
  } finally {
    transporter.close();
  }
};
