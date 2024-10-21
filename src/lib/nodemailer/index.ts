import nodemailer from "nodemailer";

const { EMAIL_USER, MAILGUN_API_KEY, EMAIL_PORT, EMAIL_HOST } = process.env;

if (!EMAIL_USER || !MAILGUN_API_KEY || !EMAIL_PORT || !EMAIL_HOST) {
  throw new Error("Veuillez configurer les variables d'environnement EMAIL_USER, MAILGUN_API_KEY, EMAIL_PORT et EMAIL_HOST");
}
export const clubEmail = EMAIL_USER;

export const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT, 10),
  secure: parseInt(EMAIL_PORT, 10) === 465, // true for port 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: MAILGUN_API_KEY,
  },
});


