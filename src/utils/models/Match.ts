import Utils from "@/utils/models/Utils";

import { MONTH_ORDER } from "@/utils/magicNumber";

type Constructor = {
  division: string;
  matchNumber: string;
  teamA: string;
  teamB: string;
  date: string;
  time: string;
  gym?: string;
  _id?: string;
  __v?: number;
};

export default class Match {
  private readonly _division: string;
  private readonly _matchNumber: string;
  private readonly _teamA: string;
  private readonly _teamB: string;
  private readonly _date: string;
  private readonly _time: string;
  private readonly _gym: string;
  constructor(data: Constructor) {
    this._division = data.division;
    this._matchNumber = data.matchNumber;
    this._teamA = data.teamA;
    this._teamB = data.teamB;
    this._date = data.date;
    this._time = data.time;
    this._gym = data.gym ?? "à définir";
  }
  get division(): string {
    return this._division;
  }
  get isHome(): boolean {
    return this._teamA.includes("ARGENTEUIL");
  }

  get matchNumber(): string {
    return this._matchNumber;
  }

  get opponent(): string {
    return this.isHome ? this.teamB.toLowerCase() : this.teamA.toLowerCase();
  }

  get teamA(): string {
    return this._teamA;
  }

  get teamB(): string {
    return this._teamB;
  }

  get isExempt(): boolean {
    return this._teamB === "Exempt" || this._teamA === "Exempt";
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
    const formatedDate = Utils.parseDate(this._date);
    return MONTH_ORDER[formatedDate.getMonth()];
  }

  get day() {
    const formatedDate = Utils.parseDate(this._date);
    return formatedDate.getDate();
  }

  toObject() {
    return {
      division: this.division,
      matchNumber: this.matchNumber,
      teamA: this.teamA,
      teamB: this.teamB,
      date: this.date,
      time: this.time,
      gym: this.gym,
    };
  }

  static groupByMonth(matchs: Match[]): { [key: string]: Match[] } {
    const groupedMatchs: { [key: string]: Match[] } = {};
    const sortedGroupedMatchs: { [key: string]: Match[] } = {};

    // Grouper les matchs par mois
    matchs.forEach((match) => {
      const month = match.month;
      if (!groupedMatchs[month]) {
        groupedMatchs[month] = [];
      }
      groupedMatchs[month].push(match);
    });

    // Trier les clés des mois
    const sortedKeys = Object.keys(groupedMatchs).sort((a, b) => MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b));

    // Répartir les matchs triés dans le nouvel objet
    sortedKeys.forEach((key) => {
      sortedGroupedMatchs[key] = groupedMatchs[key];
    });

    return sortedGroupedMatchs;
  }

  static getCategories(matchs: Match[]): string[] {
    return matchs.reduce((acc, match) => {
      if (!acc.includes(match.division)) {
        acc.push(match.division);
      }
      return acc;
    }, [] as string[]);
  }

  static getWeekends(matchs: Match[]): string[] {
    const days = matchs.reduce((acc, match) => {
      const day = match.day;
      if (!acc.includes(day)) {
        acc.push(day);
      }
      return acc;
    }, [] as number[]);

    return days
      .toSorted((a, b) => a - b)
      .filter((day, index, array) => index === 0 || array[index - 1] !== day - 1)
      .map((day) => day.toString() + " / " + (day + 1).toString());
  }
}
