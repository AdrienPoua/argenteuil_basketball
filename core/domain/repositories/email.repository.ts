import { EmailEntity } from "@/core/domain/entities/email.entity"

export interface EmailRepository {
  sendEmail(options: EmailEntity): Promise<void>
}
