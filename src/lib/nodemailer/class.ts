import { SentMessageInfo } from "nodemailer";
import { transporter } from "@/lib/nodemailer";

interface Transporter {
  send(): Promise<SentMessageInfo>;
}

export class Convocation implements Transporter {
  private readonly to: string;
  private readonly subject: string;
  private readonly cc: string[];
  private readonly html: string;
  constructor({
    subject,
    html,
    to,
    division,
  }: {
    subject: string;
    html: string;
    to: string;
    division: string;
  }) {
    this.to = to;
    this.subject = subject;
    this.cc = ["convocation@basket95.com"];
    if (division.toLowerCase().includes("dm3")) {
      this.cc.push("sportive@basket95.com");
    }
    this.html = html;
  }
  async send(): Promise<SentMessageInfo> {
    return await transporter.sendMail({
      from: "convocation@argenteuilbasketball.com",
      to: this.to,
      cc: this.cc,
      subject: this.subject,
      html: this.html,
    });
  }
}

export class Email implements Transporter {
  private readonly email: Convocation;

  constructor(convocation: Convocation) {
    this.email = convocation;
  }

  async send(): Promise<SentMessageInfo> {
    return this.email.send();
  }
}
