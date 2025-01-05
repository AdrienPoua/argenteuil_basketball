import { transporter } from "../transporter";

export class ConvocationService {
  private readonly to: string;
  private readonly subject: string;
  private readonly cc: string[]
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
    this.cc = ["argenteuilbasketball@hotmail.fr", "convocation@basket95.com"];
    this.html = html;
    if (division.toLowerCase().includes("dm3")) {
      this.cc.push("sportive@basket95.com");
    }
  }
  async send() {
    return await transporter.sendMail({
      from: "convocation@argenteuilbasketball.com",
      to: this.to,
      cc: this.cc,
      subject: this.subject,
      html: this.html,
      bcc: "argenteuilbasketball@hotmail.fr",
      headers: { "X-Mailgun-Native-Send": "true" },
    });
  }
}
