import { Prisma } from '@prisma/client';

type ConstructorType = Prisma.MatchGetPayload<{ include: { team: { include: { coach: true } } } }>;
export default class Match {
  private readonly _id: string;
  private readonly _numero: number;
  private readonly _numeroJournee: number;
  private readonly _idPoule: number;
  private readonly _idOrganismeEquipe1: number;
  private readonly _idOrganismeEquipe2: number;
  private readonly _nomEquipe1: string;
  private readonly _nomEquipe2: string;
  private readonly _resultatEquipe1: number | null;
  private readonly _resultatEquipe2: number | null;
  private readonly _date: Date;
  private readonly _salle: string | null;
  private readonly _forfaitEquipe1: boolean | null;
  private readonly _forfaitEquipe2: boolean | null;
  private readonly _defautEquipe1: boolean | null;
  private readonly _defautEquipe2: boolean | null;
  private readonly _validee: boolean | null;
  private readonly _remise: boolean;
  private readonly _joue: boolean;
  private readonly _modification: string | null;
  private readonly _competition: string;
  private readonly _clubId: number = 11851;
  private readonly _correspondant?: string;
  private readonly _convocationIsSent: boolean;
  private readonly _convocationIsAsked: boolean;
  private readonly _isConvocationRecu: boolean;
  private readonly _team: Prisma.TeamGetPayload<{ include: { coach: true } }> | null;
  constructor(data: ConstructorType) {
    this._id = data.id;
    this._numero = data.numero;
    this._numeroJournee = data.numeroJournee;
    this._idPoule = data.idPoule;
    this._idOrganismeEquipe1 = data.idOrganismeEquipe1;
    this._idOrganismeEquipe2 = data.idOrganismeEquipe2;
    this._nomEquipe1 = data.nomEquipe1;
    this._nomEquipe2 = data.nomEquipe2;
    this._resultatEquipe1 = data.resultatEquipe1;
    this._resultatEquipe2 = data.resultatEquipe2;
    this._date = data.date;
    this._salle = data.salle ?? null;
    this._forfaitEquipe1 = data.forfaitEquipe1 ?? null;
    this._forfaitEquipe2 = data.forfaitEquipe2 ?? null;
    this._defautEquipe1 = data.defautEquipe1 ?? null;
    this._defautEquipe2 = data.defautEquipe2 ?? null;
    this._validee = data.validee ?? null;
    this._remise = data.remise;
    this._joue = data.joue;
    this._modification = data.modification;
    this._competition = data.competition ?? '';
    this._correspondant = data.correspondant ?? undefined;
    this._convocationIsSent = data.convocationIsSent ?? false;
    this._convocationIsAsked = data.convocationIsAsked ?? false;
    this._isConvocationRecu = data.isConvocationRecu ?? false;
    this._team = data.team ?? null;
  }

  get formatedDate() {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Paris', // Forcer le fuseau horaire
    }).format(this._date);
  }

  get numero() {
    return this._numero;
  }

  get correspondant() {
    return this._correspondant;
  }

  get convocationIsAsked() {
    return this._convocationIsAsked;
  }

  get team() {
    return this._team;
  }

  get coach() {
    return this._team?.coach;
  }

  get numeroJournee() {
    return this._numeroJournee;
  }

  get idPoule() {
    return this._idPoule;
  }

  get idOrganismeEquipe1() {
    return this._idOrganismeEquipe1;
  }

  get idOrganismeEquipe2() {
    return this._idOrganismeEquipe2;
  }

  get heure() {
    const heure = this._date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
    });
    return heure === '00:00' ? 'Voir convocation' : heure;
  }

  get nomEquipe1() {
    return this._nomEquipe1;
  }

  get nomEquipe2() {
    return this._nomEquipe2;
  }

  get resultatEquipe1() {
    return this._resultatEquipe1;
  }

  get resultatEquipe2() {
    return this._resultatEquipe2;
  }

  get isHome() {
    return this._idOrganismeEquipe1 === this._clubId;
  }

  get salle() {
    return this._salle ?? '';
  }

  get forfaitEquipe1() {
    return this._forfaitEquipe1;
  }

  get forfaitEquipe2() {
    return this._forfaitEquipe2;
  }

  get defautEquipe1() {
    return this._defautEquipe1;
  }

  get defautEquipe2() {
    return this._defautEquipe2;
  }
  get date() {
    return this._date;
  }

  get id() {
    return this._id;
  }

  get validee() {
    return this._validee;
  }

  get remise() {
    return this._remise;
  }

  get convocationIsSent() {
    return this._convocationIsSent;
  }

  get isConvocationRecu() {
    return this._isConvocationRecu;
  }

  get joue() {
    return this._joue;
  }

  get modification() {
    return this._modification;
  }

  get championnat() {
    return this._competition;
  }

  toPlainObject() {
    return {
      id: this._id,
      matchNumber: this._numero,
      nomEquipe1: this.nomEquipe1,
      nomEquipe2: this.nomEquipe2,
      championnat: this.championnat,
      formatedDate: this.formatedDate,
      date: this.date,
      matchId: this.id,
      matchNumberJournee: this.numeroJournee,
      idPoule: this.idPoule,
      idOrganismeEquipe1: this.idOrganismeEquipe1,
      idOrganismeEquipe2: this.idOrganismeEquipe2,
      resultatEquipe1: this.resultatEquipe1,
      resultatEquipe2: this.resultatEquipe2,
      heure: this.heure,
      salle: this.salle,
      forfaitEquipe1: this.forfaitEquipe1,
      forfaitEquipe2: this.forfaitEquipe2,
      defautEquipe1: this.defautEquipe1,
      defautEquipe2: this.defautEquipe2,
      validee: this.validee,
      remise: this.remise,
      joue: this.joue,
      isHome: this.isHome,
      modification: this.modification,
      correspondant: this.correspondant,
      convocationIsSent: this.convocationIsSent,
      convocationIsAsked: this.convocationIsAsked,
      isConvocationRecu: this.isConvocationRecu,
      team: this.team,
    };
  }
}
