import { Prisma } from "@prisma/client";

type ConstructorType = Prisma.MatchGetPayload<{}>;
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
  private readonly _competition: string | null;

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
    this._competition = data.competition ?? null;
  }
  get formattedDate() {
    return this._date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  get formattedTime() {
    return `${String(this._date.getHours()).padStart(2, '0')}:${String(this._date.getMinutes()).padStart(2, '0')}`;
  }

}
