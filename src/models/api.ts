import { CompetitionType, CompetitionData, CompetitionTeams } from "@/types/api";
export class Ranking {
  private _teams: CompetitionTeams[];
  constructor(data: CompetitionType) {
    this._teams = data.teams;
  }

  get teams(): CompetitionTeams[] {
    return this._teams;
  }

  static readonly getValue = (data: CompetitionTeams, key: keyof CompetitionData) => {
    return data.data.find((item) => item.hasOwnProperty(key))?.[key];
  };
  static getPts(data: CompetitionTeams) {
    return this.getValue(data, "pts");
  }
  static getJo(data: CompetitionTeams) {
    return this.getValue(data, "jo");
  }
  static getG(data: CompetitionTeams) {
    return this.getValue(data, "g");
  }
  static getN(data: CompetitionTeams) {
    return this.getValue(data, "n");
  }
  static getP(data: CompetitionTeams) {
    return this.getValue(data, "p");
  }
  static getF(data: CompetitionTeams) {
    return this.getValue(data, "f");
  }
  static getBp(data: CompetitionTeams) {
    return this.getValue(data, "bp");
  }
  static getBc(data: CompetitionTeams) {
    return this.getValue(data, "bc");
  }
  static getCoeff(data: CompetitionTeams) {
    return this.getValue(data, "coeff");
  }
  static getFixPoints(data: CompetitionTeams) {
    return this.getValue(data, "fix_points");
  }
}
