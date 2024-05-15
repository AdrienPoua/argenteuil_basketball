import {
  MemberType,
  CoachType,
  LeaderType,
  PlayerType
} from "../types";


export class Match {
  constructor(data) {
    this._division = data.Division;
    this._number = data["N° de match "];
    this._teamA = data["Equipe 1"];
    this._teamB = data["Equipe 2"];
    this._date = data["Date de rencontre"];
    this._gym = data.Salle;
    this._time = data.Heure;
    this._cancel = data.cancel || false;
  }

  get date() {
    return Utils.USA_DATE(this._date);
  }
  get time() {
    return this._time;
  }

  get cancel() {
    return this._cancel;
  }

  get number() {
    return this._number;
  }
  get division() {
    return this._division.split("-")[0];
  }
  get teamA() {
    return this._teamA;
  }
  get teamB() {
    return this._teamB;
  }
  get gym() {
    return this._gym;
  }

  isMatchToday() {
    const today = new Date();
    const matchDate = new Date(this.USA_DATE());
    return matchDate.toDateString() === today.toDateString();
  }
}

export class NewsModel {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._date = data.date;
    this._img = data.img;
    this._url = data.url;
    this._main = data.main;
    this._secondary = data.secondary;
    this._type = data.type;
  }

  // Getters
  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get title() {
    return this._title;
  }

  get date() {
    return Utils.USA_DATE(this._date);
  }

  get img() {
    return this._img;
  }

  get url() {
    return this._url;
  }

  get main() {
    return this._main;
  }

  get secondary() {
    return this._secondary;
  }

  static sortByDate(array) {
    return array.sort((a, b) => {
      const dateA = new Date(Utils.USA_DATE(a.date));
      const dateB = new Date(Utils.USA_DATE(b.date));
      return dateB - dateA;
    });
  }
}

export class Utils {
  static USA_DATE(frenchDate) {
    const [day, month, year] = frenchDate.split("/");
    return `${year}/${month}/${day}`;
  }
  static dateString(data) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return new Date(data).toLocaleDateString("fr-FR", options).toUpperCase();
  }
}

export class NavLinkModel {
  constructor(data) {
    this._title = data.title;
    this._url = data.url;
  }
  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
}

export class NavDropdownModel {
  constructor(data) {
    this._title = data.title;
    this._subItems = data.subItems;
  }
  static create(subitems) {
    return subitems.map((subitem) => new SubNavItem(subitem));
  }
  get title() {
    return this._title;
  }
  get subItems() {
    return this._subItems;
  }
}

export class SubNavItem {
  constructor(data) {
    this._title = data.title;
    this._url = data.url;
  }
  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
}

export class Member implements MemberType {
  private _name: string;
  private _email: string;
  role: string;

  constructor(data: MemberType) {
    this._name = data.name;
    this._email = data.email;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}

export class Coach extends Member implements CoachType {
  private _number: string;
  private _img?: string;
  private _team: string[];

  constructor(data: CoachType) {
    super(data);
    
    // Validation des données
    if (typeof data.number !== "string") {
      throw new Error("Invalid data: number must be a string");
    }
    
    if (data.img !== undefined && typeof data.img !== "string") {
      throw new Error("Invalid data: img must be a string");
    }
    if (!Array.isArray(data.team)) {
      throw new Error("Invalid data: team must be an array of strings");
    }

    // Initialisation des propriétés
    this._number = data.number;
    this._img = data.img;
    this._team = data.team;

    if (!data.team) {
      throw new Error("Le coach n'a pas d'équipe assignée");
    }
  }

  get number(): string {
    return this._number;
  }

  get img(): string | undefined {
    return this._img;
  }

  get team(): string[] {
    return this._team;
  }

  get isCoach(): true {
    return true;
  }
}

export class Leader extends Member implements LeaderType {
  private _role: string[];
  private _number: string;
  private _img?: string;
  private _isLeader: true;

  constructor(data: LeaderType) {
    super(data);

    if (typeof data.number !== "string") {
      throw new Error("Invalid data: number must be a string");
    }

    if (data.img !== undefined && typeof data.img !== "string") {
      throw new Error("Invalid data: img must be a string");
    }

    if (!Array.isArray(data.role)) {
      throw new Error("Invalid data: role must be an array of strings");
    }

    this._role = data.role;
    this._number = data.number;
    this._img = data.img;
    this._isLeader = true;
  }

  get role(): string[] {
    return this._role;
  }

  get number(): string {
    return this._number;
  }

  get img(): string | undefined {
    return this._img;
  }

  get isLeader(): true {
    return true
  }
}


export class Player extends Member implements PlayerType {
  private _team: string[];
  private _isPlayer: true;
  private _number?: string;
  private _img?: string;

  constructor(data) {
    super(data);
    if (!data.hasOwnProperty("team")) {
      throw new Error("Le joueur n'a pas d'équipe assignée");
    }
    this._player = true;
    this._team = data.team;
  }
  get team() {
    return this._team;
  }
}