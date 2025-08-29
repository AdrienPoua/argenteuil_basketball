import club from '@/core/shared/config/club'
import { TeamEntity } from './team.entity'
export interface Match {
  id: string
  numero: number | null
  numeroJournee: number | null
  idPoule: number | null
  idOrganismeEquipe1: number | null
  idOrganismeEquipe2: number | null
  nomEquipe1: string
  nomEquipe2: string
  idEngagementEquipe1: number | null
  idEngagementEquipe2: number | null
  resultatEquipe1: number | null
  resultatEquipe2: number | null
  date: string
  horaire: number
  salle: string
  penaliteEquipe1: boolean | null
  penaliteEquipe2: boolean | null
  forfaitEquipe1: boolean | null
  forfaitEquipe2: boolean | null
  defautEquipe1: boolean | null
  defautEquipe2: boolean | null
  validee: boolean | null
  remise: boolean | null
  joue: boolean | null
  handicap1: number | null
  handicap2: number | null
  dateSaisieResultat: string | null
  creation: string | null
  modification: string | null
  codeMatch: string | null
  etat: string | null
  // added by us
  team: TeamEntity | null
  created_at: string
  arbitre1: string | null
  arbitre2: string | null
  marqueur: string | null
  chronometreur: string | null
  isAmical: boolean
}

/**
 * @description MatchEntity is the entity that represents a match
 * @param date string - format YYYY-MM-DD
 * @param horaire number - format HHMM
 * @param dateSaisieResultat string - format ISO 8601
 * @param creation string - format ISO 8601
 * @param modification string - format ISO 8601
 */
export class MatchEntity implements Match {
  private readonly _id: string
  private readonly _numero: number | null
  private readonly _numeroJournee: number | null
  private readonly _idPoule: number | null
  private readonly _idOrganismeEquipe1: number | null
  private readonly _idOrganismeEquipe2: number | null
  private readonly _idEngagementEquipe1: number | null
  private readonly _idEngagementEquipe2: number | null
  private readonly _nomEquipe1: string
  private readonly _nomEquipe2: string
  private readonly _resultatEquipe1: number | null
  private readonly _resultatEquipe2: number | null
  private readonly _date: string
  private readonly _horaire: number
  private readonly _salle: string
  private readonly _penaliteEquipe1: boolean
  private readonly _penaliteEquipe2: boolean
  private readonly _forfaitEquipe1: boolean | null
  private readonly _forfaitEquipe2: boolean | null
  private readonly _defautEquipe1: boolean | null
  private readonly _defautEquipe2: boolean | null
  private readonly _validee: boolean | null
  private readonly _remise: boolean
  private readonly _joue: boolean
  private readonly _handicap1: number | null
  private readonly _handicap2: number | null
  private readonly _dateSaisieResultat: string | null
  private readonly _creation: string | null
  private readonly _modification: string | null
  private readonly _created_at: string
  private readonly _codeMatch: string | null
  private readonly _etat: string | null
  private readonly _arbitre1: string | null
  private readonly _arbitre2: string | null
  private readonly _marqueur: string | null
  private readonly _chronometreur: string | null
  private readonly _isAmical: boolean
  private readonly _team: TeamEntity | null
  constructor(data: Match) {
    this._id = data.id
    this._numero = data.numero
    this._numeroJournee = data.numeroJournee
    this._idPoule = data.idPoule
    this._idOrganismeEquipe1 = data.idOrganismeEquipe1
    this._idOrganismeEquipe2 = data.idOrganismeEquipe2
    this._idEngagementEquipe1 = data.idEngagementEquipe1
    this._idEngagementEquipe2 = data.idEngagementEquipe2
    this._nomEquipe1 = data.nomEquipe1
    this._nomEquipe2 = data.nomEquipe2
    this._resultatEquipe1 = data.resultatEquipe1
    this._resultatEquipe2 = data.resultatEquipe2
    this._date = data.date
    this._horaire = data.horaire
    this._salle = data.salle
    this._codeMatch = data.codeMatch
    this._penaliteEquipe1 = data.penaliteEquipe1 ?? false
    this._penaliteEquipe2 = data.penaliteEquipe2 ?? false
    this._forfaitEquipe1 = data.forfaitEquipe1
    this._forfaitEquipe2 = data.forfaitEquipe2
    this._defautEquipe1 = data.defautEquipe1
    this._defautEquipe2 = data.defautEquipe2
    this._validee = data.validee
    this._remise = data.remise ?? false
    this._joue = data.joue ?? false
    this._handicap1 = data.handicap1
    this._handicap2 = data.handicap2
    this._dateSaisieResultat = data.dateSaisieResultat
    this._creation = data.creation
    this._etat = data.etat
    this._modification = data.modification
    this._team = data.team
    this._codeMatch = data.codeMatch
    this._created_at = data.created_at
    this._arbitre1 = data.arbitre1
    this._arbitre2 = data.arbitre2
    this._marqueur = data.marqueur
    this._chronometreur = data.chronometreur
    this._isAmical = data.isAmical ?? false
  }

  get id(): string {
    return this._id
  }

  get codeMatch(): string | null {
    return this._codeMatch
  }

  get numero(): number | null {
    return this._numero
  }

  get etat(): string | null {
    return this._etat
  }

  get created_at(): string {
    return this._created_at
  }

  get numeroJournee(): number | null {
    return this._numeroJournee
  }

  get idEngagementEquipe1(): number | null {
    return this._idEngagementEquipe1
  }

  get idEngagementEquipe2(): number | null {
    return this._idEngagementEquipe2
  }

  get idPoule(): number | null {
    return this._idPoule
  }

  get idOrganismeEquipe1(): number | null {
    return this._idOrganismeEquipe1
  }

  get idOrganismeEquipe2(): number | null {
    return this._idOrganismeEquipe2
  }

  get nomEquipe1(): string {
    return this._nomEquipe1
  }

  get nomEquipe2(): string {
    return this._nomEquipe2
  }

  get resultatEquipe1(): number {
    return this._resultatEquipe1 ?? 0
  }

  get resultatEquipe2(): number {
    return this._resultatEquipe2 ?? 0
  }

  get date(): string {
    return this._date
  }

  get horaire(): number {
    return this._horaire
  }

  get salle(): string {
    return this._salle
  }

  get penaliteEquipe1(): boolean {
    return this._penaliteEquipe1
  }

  get penaliteEquipe2(): boolean {
    return this._penaliteEquipe2
  }

  get forfaitEquipe1(): boolean {
    return this._forfaitEquipe1 ?? false
  }

  get forfaitEquipe2(): boolean {
    return this._forfaitEquipe2 ?? false
  }

  get defautEquipe1(): boolean {
    return this._defautEquipe1 ?? false
  }

  get defautEquipe2(): boolean {
    return this._defautEquipe2 ?? false
  }

  get validee(): boolean {
    return this._validee ?? false
  }

  get remise(): boolean {
    return this._remise
  }

  get joue(): boolean {
    return this._joue
  }

  get handicap1(): number | null {
    return this._handicap1
  }

  get handicap2(): number | null {
    return this._handicap2
  }

  get dateSaisieResultat(): string | null {
    return this._dateSaisieResultat
  }

  get creation(): string | null {
    return this._creation
  }

  get modification(): string | null {
    return this._modification
  }

  get arbitre1(): string | null {
    return this._arbitre1
  }

  get arbitre2(): string | null {
    return this._arbitre2
  }

  get marqueur(): string | null {
    return this._marqueur
  }

  get chronometreur(): string | null {
    return this._chronometreur
  }

  get isAmical(): boolean {
    return this._isAmical
  }

  get isPlayed(): boolean {
    return this._resultatEquipe1 !== 0 && this._resultatEquipe2 !== 0
  }

  get team(): TeamEntity | null {
    return this._team
  }

  public getTeamName(): string {
    return this.isHomeTeam() ? this._nomEquipe1 : this._nomEquipe2
  }

  public getOpponentName(): string {
    return this.isHomeTeam() ? this._nomEquipe2 : this._nomEquipe1
  }

  public isHomeTeam(): boolean {
    return this._idOrganismeEquipe1 === club.clubId
  }

  public getScore(): string {
    if (!this._joue) return '-'
    return `${this._resultatEquipe1 ?? 0} - ${this._resultatEquipe2 ?? 0}`
  }

  public toObject() {
    return {
      id: this._id,
      numero: this._numero,
      numeroJournee: this._numeroJournee,
      idPoule: this._idPoule,
      idOrganismeEquipe1: this._idOrganismeEquipe1,
      idOrganismeEquipe2: this._idOrganismeEquipe2,
      idEngagementEquipe1: this._idEngagementEquipe1,
      idEngagementEquipe2: this._idEngagementEquipe2,
      nomEquipe1: this._nomEquipe1,
      nomEquipe2: this._nomEquipe2,
      resultatEquipe1: this._resultatEquipe1,
      resultatEquipe2: this._resultatEquipe2,
      date: this._date,
      horaire: this._horaire,
      salle: this._salle,
      penaliteEquipe1: this._penaliteEquipe1,
      penaliteEquipe2: this._penaliteEquipe2,
      forfaitEquipe1: this._forfaitEquipe1,
      forfaitEquipe2: this._forfaitEquipe2,
      defautEquipe1: this._defautEquipe1,
      defautEquipe2: this._defautEquipe2,
      validee: this._validee,
      remise: this._remise,
      joue: this._joue,
      handicap1: this._handicap1,
      handicap2: this._handicap2,
      dateSaisieResultat: this._dateSaisieResultat,
      creation: this._creation,
      modification: this._modification,
      codeMatch: this._codeMatch,
      etat: this._etat,
      created_at: this._created_at,
      arbitre1: this._arbitre1,
      arbitre2: this._arbitre2,
      marqueur: this._marqueur,
      chronometreur: this._chronometreur,
      isAmical: this._isAmical,
      team: this._team?.toObject() ?? null,
    }
  }
}
