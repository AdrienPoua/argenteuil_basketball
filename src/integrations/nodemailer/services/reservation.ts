import { transporter } from '../transporter';
import Match from '@/models/Match';
import { render } from '@react-email/components';
import ReservationTemplate from '@/integrations/react-email/templates/Reservations';

type PropsType = ReturnType<Match['toPlainObject']>;

export class ReservationService {
  private readonly _matches: PropsType[];
  
  constructor(matches: PropsType[]) {
    this._matches = matches;
  }

  get to() {
    return 'argenteuilbasketball@hotmail.fr';
  }

  get subject() {
    return 'Récapitulatif des matchs à venir - Argenteuil Basketball';
  }

  get cc() {
    return [];
  }

  async getHtml() {
    const component = ReservationTemplate({ matches: this._matches });
    return render(component);
  }

  async send() {
    try {
      const html = await this.getHtml();
      return await transporter.sendMail({
        from: 'convocation@argenteuilbasketball.com',
        to: this.to,
        cc: this.cc,
        subject: this.subject,
        html: html,
        headers: { 'X-Mailgun-Native-Send': 'true' },
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du récapitulatif des matchs :", error);
      return false;
    }
  }
} 