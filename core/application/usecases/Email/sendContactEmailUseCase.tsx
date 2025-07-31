import { z } from 'zod'
import { EmailEntity } from '../../../domain/entities/email.entity'
import { EmailRepository } from '../../../domain/repositories/email.repository'
import { ContactEmail } from '../../../infrastructure/resend/templates/contact'
import club from '../../../shared/config/club'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const SendContactEmailUseCaseSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
})

type SendContactEmailUseCaseInput = z.infer<typeof SendContactEmailUseCaseSchema>
export class SendContactEmailUseCase implements BaseUseCase<SendContactEmailUseCaseInput, void> {
  constructor(private readonly emailRepository: EmailRepository) {}

  async execute(input: unknown): Promise<void> {
    try {
      const data = SendContactEmailUseCaseSchema.parse(input)
      const email = new EmailEntity({
        from: club.emails.noreply,
        to: club.emails.contact,
        bcc: 'adrien.poua@gmail.com',
        subject: 'Nouveau message de contact',
        template: <ContactEmail name={data.name} email={data.email} message={data.message} />,
      })
      const result = await this.emailRepository.sendEmail(email)
      return result
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
