import { SentMessageInfo } from "nodemailer";
import { transporter, clubEmail } from "@/lib/nodemailer";

export class SingleTargetHtmlPayload implements Transporter {
  private to: string;
  private subject: string;
  private html: string;
  constructor(payload: { to: string; subject: string; html: string }) {
    this.to = payload.to;
    this.subject = payload.subject;
    this.html = payload.html;
  }
  async send(): Promise<SentMessageInfo> {
    return await transporter.sendMail({
      from: clubEmail,
      to: this.to,
      subject: this.subject,
      html: this.html,
    });
  }
}

export class MultipleTargetPayload implements Transporter {
  private subject: string;
  private text: string;
  private bcc: string[];
  constructor(payload: { subject: string; text: string; bcc: string[] }) {
    this.subject = payload.subject;
    this.text = payload.text;
    this.bcc = payload.bcc;
  }
  async send(): Promise<SentMessageInfo> {
    return await transporter.sendMail({
      from: clubEmail,
      subject: this.subject,
      text: this.text,
      bcc: this.bcc,
    });
  }
}

interface Transporter {
  send(): Promise<SentMessageInfo>;
}

export class Email implements Transporter {
  private transporter: Transporter;
  constructor(transporter: Transporter) {
    this.transporter = transporter;
  }
  send(): Promise<SentMessageInfo> {
    return this.transporter.send();
  }
}
