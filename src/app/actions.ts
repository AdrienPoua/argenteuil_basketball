"use server";
import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string, cc? : string) => {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_PORT, EMAIL_HOST } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_PORT || !EMAIL_HOST) {
    throw new Error("Veuillez configurer les variables d'environnement EMAIL_USER, EMAIL_PASS, EMAIL_PORT et EMAIL_HOST");
  }

  let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10),
    secure: parseInt(EMAIL_PORT, 10) === 465, // true for port 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    // Envoyer l'email
    await transporter.sendMail({
      from: EMAIL_USER,
      cc : to,
      subject,
      text,
    });

    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, message: "Erreur lors de l'envoi de l'email", error };
  }
};
