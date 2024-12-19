import { SentMessageInfo } from "nodemailer";

export interface Send {
  send(): Promise<SentMessageInfo>;
}
