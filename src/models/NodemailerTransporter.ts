import nodemailer from "nodemailer";

const { MAILGUN_API_KEY, EMAIL_PORT, EMAIL_HOST } = process.env;

if (!MAILGUN_API_KEY?.trim() || !EMAIL_PORT?.trim() || !EMAIL_HOST?.trim()) {
  throw new Error(
    "Veuillez configurer correctement les variables d'environnement : MAILGUN_API_KEY, EMAIL_PORT et EMAIL_HOST."
  );
}


type TransporterBuilder = {
  host: string;
  port: number;
  auth: { user: string; pass: string };
};

export default class Transporter {
  host: string;
  port: number;
  auth: { user: string; pass: string };

  constructor(builder: TransporterBuilder) {
    this.host = builder.host;
    this.port = builder.port;
    this.auth = builder.auth;
  }

  createTransporter() {
    try {
      return nodemailer.createTransport(this);
    } catch (error) {
      console.error("Error creating transporter:", error);
      throw new Error("Failed to create transporter. Check your configuration.");
    }
  }
  

  static get Builder() {
    return class Builder {
      host: string;
      port: number;
      auth: { user: string; pass: string };

      constructor() {
        this.host = "smtp.eu.mailgun.org"
        this.port = 587
        this.auth = {
          user: "postmaster@email.argenteuilbasketball.com",
          pass: MAILGUN_API_KEY as string,
        };
      }

      setHost(host: string) {
        this.host = host;
        return this; // Permet le chaînage
      }

      setPort(port: number) {
        this.port = port;
        return this; // Permet le chaînage
      }

      setAuth(auth: { user: string; pass: string }) {
        this.auth = auth;
        return this; // Permet le chaînage
      }

      build() {
        return new Transporter(this);
      }
    };
  }
}
