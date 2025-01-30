import { transporter } from '../transporter';
import Match from '@/models/Match';
import { getHtml } from '@/services/react-email/templates/Convocation';

type MatchType = ReturnType<Match['toPlainObject']>;
export class ConvocationService {
  private readonly _match: MatchType;
  private readonly _coachEmail: string | undefined;
  constructor(match: MatchType, coachEmail: string | undefined) {
    this._match = match;
    this._coachEmail = coachEmail;
  }

  get to() {
    return this._match.correspondant;
  }

  get subject() {
    const division = this._match.championnat;
    const firstConvocation = `Convocation ${division} - Match n°${this._match.matchNumber}`;
    const secondConvocation = `Convocation MODIFICATIVE - ANNULE ET REMPLACE - ${division} - Match n°${this._match.matchNumber}`;
    return !this._match.convocationIsSent ? firstConvocation : secondConvocation;
  }

  get cc() {
    const array = ['argenteuilbasketball@hotmail.fr', 'convocation@basket95.com'];
    if (this._match.championnat.toLowerCase().includes('dm3')) {
      array.push('convocation@basket95.com');
    }
    if (this._coachEmail) {
      array.push(this._coachEmail);
    }
    if (this._match.convocationIsSent) {
      array.push('rcassandra640@gmail.com');
    }
    return array;
  }

  async getHtml() {
    return await getHtml(this._match);
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
        bcc: 'argenteuilbasketball@hotmail.fr',
        headers: { 'X-Mailgun-Native-Send': 'true' },
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la convocation :", error);
      return false;
    }
  }
}
