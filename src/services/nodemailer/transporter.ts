import nodemailer from "nodemailer";

const { MAILGUN_API_KEY, EMAIL_PORT, EMAIL_HOST } = process.env;

if (!MAILGUN_API_KEY || !EMAIL_PORT || !EMAIL_HOST) {
  console.log(MAILGUN_API_KEY);
  throw new Error(
    "Veuillez configurer les variables d'environnement, MAILGUN_API_KEY, EMAIL_PORT et EMAIL_HOST",
  );
}

export const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT, 10),
  secure: false, // false pour TLS
  auth: {
    user: "postmaster@email.argenteuilbasketball.com",
    pass: MAILGUN_API_KEY,
  },
});

