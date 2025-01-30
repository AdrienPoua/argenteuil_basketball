import nodemailer from 'nodemailer';

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
      console.error('Error creating transporter:', error);
      throw new Error('Failed to create transporter. Check your configuration.');
    }
  }

  static get Builder() {
    return class Builder {
      host: string = '';
      port: number = 0;
      auth: { user: string; pass: string } = { user: '', pass: '' };

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
