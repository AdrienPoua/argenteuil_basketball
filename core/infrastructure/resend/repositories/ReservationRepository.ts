import { Resend } from 'resend'
import { EmailEntity } from '../../../domain/entities/email.entity'
import { EmailRepository } from '../../../domain/repositories/email.repository'
import resend from '../index'

export class ResendEmailRepository implements EmailRepository {
  private readonly provider: Resend = resend

  async sendEmail(options: EmailEntity): Promise<void> {
    const { to, subject, from, cc, bcc, template } = options

    try {
      const { error } = await this.provider.emails.send({
        from,
        to,
        subject,
        cc,
        bcc,
        react: template,
      })
      if (error) {
        throw error
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
