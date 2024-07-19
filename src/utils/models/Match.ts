import { MatchType } from "@/utils/types";
import Utils from "@/utils/models/Utils";

export default class Match {
  private _division: string;
  private _matchNumber: string;
  private _teamA: string;
  private _teamB: string;
  private _date: string;
  private _time: string;
  private _gym: string;
  constructor(data: MatchType) {
    this._division = data.Division;
    this._matchNumber = data["N° de match "];
    this._teamA = data["Equipe 1"];
    this._teamB = data["Equipe 2"];
    this._date = data["Date de rencontre"];
    this._time = data.Heure;
    this._gym = data.Salle;
  }

  get division(): string {
    return this._division;
  }
  get home(): boolean {
    return this._teamA.includes("ARGENTEUIL");
  }

  get matchNumber(): string {
    return this._matchNumber;
  }
  get teamA(): string {
    return this._teamA;
  }
  get teamB(): string {
    return this._teamB;
  }
  get date(): string {
    return this._date;
  }
  get time(): string {
    return this._time;
  }
  get gym(): string {
    return this._gym;
  }
  get month() {
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const formatedDate = Utils.parseDate(this._date);
    return months[formatedDate.getMonth()];
  }

  get day() {
    const formatedDate = Utils.parseDate(this._date);
    return formatedDate.getDate();
  }

  static groupByMonth(matchs: Match[]): { [key: string]: Match[] } {
    const groupedMatchs: { [key: string]: Match[] } = {};
    matchs.forEach((match) => {
      const month = match.month;
      if (!groupedMatchs[month]) {
        groupedMatchs[month] = [];
      }
      groupedMatchs[month].push(match);
    });
    return groupedMatchs;
  }
}
