import { SentMessageInfo } from "nodemailer";
import { transporter, clubEmail } from "@/lib/nodemailer";

interface Transporter {
  send(): Promise<SentMessageInfo>;
}
export class ConvocationEmail implements Transporter {
  private readonly from: string;
  private readonly to: string;
  private readonly subject: string;
  private readonly bcc: string[];
  private readonly html: string;
  constructor(payload: { subject: string; html: string; to: string }) {
    this.from = "a remplir";
    this.to = payload.to;
    this.subject = payload.subject;
    this.bcc = ["convocation@basket95.com"];
    this.html = payload.html;
  }
  async send(): Promise<SentMessageInfo> {
    return await transporter.sendMail({
      from: clubEmail,
      bcc: this.bcc,
      subject: this.subject,
      html: this.html,
    });
  }
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
