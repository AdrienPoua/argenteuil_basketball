import { EmailEntity } from '../../../domain/entities/email.entity';
import { MatchEntity } from '../../../domain/entities/match.entity';
import { EmailRepository } from '../../../domain/repositories/email.repository';
import ReservationEmail from '../../../infrastructure/resend/templates/reservation';
import club from '../../../shared/config/club';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

export class SendReservationEmailUseCase implements BaseUseCase<MatchEntity[], void> {
  constructor(private readonly emailRepository: EmailRepository) {}

  async execute(matchs: MatchEntity[]): Promise<void> {
    try {
      const email = new EmailEntity({
        from: club.emails.noreply,
        to: club.contact.email,
        bcc: 'adrien.poua@gmail.com',
        subject: 'Récapitulatif des matchs à venir',
        template: <ReservationEmail matchs={matchs} />,
      });
      const result = await this.emailRepository.sendEmail(email);
      return result;
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
