import Transporter from "@/models/NodemailerTransporter";
const { MAILGUN_API_KEY, EMAIL_PORT, EMAIL_HOST } = process.env;

if (!MAILGUN_API_KEY?.trim() || !EMAIL_PORT?.trim() || !EMAIL_HOST?.trim()) {
  throw new Error(
    "Veuillez configurer correctement les variables d'environnement : MAILGUN_API_KEY, EMAIL_PORT et EMAIL_HOST.",
  );
}

export const transporter = new Transporter.Builder()
  .setHost(EMAIL_HOST)
  .setPort(Number(EMAIL_PORT))
  .setAuth({
    user: "postmaster@email.argenteuilbasketball.com",
    pass: MAILGUN_API_KEY,
  })
  .build()
  .createTransporter();
