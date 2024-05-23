import { teams } from "@/data/teams.json";
import { MemberType, CoachType, LeaderType, PlayerType, AssistantType, TeamType, TrainingType, GymType } from "../types";

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
  static USA_DATE(frenchDate: string) {
    const [day, month, year] = frenchDate.split("/");
    return `${year}/${month}/${day}`;
  }
  static dateString(data: string) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return new Date(data).toLocaleDateString("fr-FR", options).toUpperCase();
  }
}

export class NavItemModel {
  private _title: string;
  private _subItems: { title: string; url: string }[];
  constructor(data: { title: string; subItems: { title: string; url: string; img: string }[] }) {
    this._title = data.title;
    this._subItems = data.subItems;
  }
  get title() {
    return this._title;
  }
  get subItems() {
    return this._subItems;
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
  private _img: string;
  private _isLeader: true;
  private _isEmailDisplayed: boolean;
  private _isNumberDisplayed: boolean;

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
    this._isEmailDisplayed = data.isEmailDisplayed || false;
    this._isNumberDisplayed = data.isNumberDisplayed || false;
  }

  get role(): string[] {
    return this._role;
  }

  get number(): string {
    return this._number;
  }

  get img(): string {
    return (
      this._img ??
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  }

  get isLeader(): true {
    return true;
  }

  get isEmailDisplayed(): boolean {
    return this._isEmailDisplayed || false;
  }

  get isNumberDisplayed(): boolean {
    return this._isNumberDisplayed || false;
  }
}

export class Player extends Member implements PlayerType {
  private _team: string[];
  private _isPlayer: true;
  private _number?: string;
  private _img?: string;

  constructor(data: PlayerType) {
    super(data);
    if (!data.hasOwnProperty("team")) {
      throw new Error("Le joueur n'a pas d'équipe assignée");
    }
    this._isPlayer = true;
    this._team = data.team;
  }
  get team() {
    return this._team;
  }
  get isPlayer() {
    return this._isPlayer;
  }
}

export class Team {
  private _name: string;
  private _coach: string;
  private _assistant: AssistantType[];
  private _img: string =
    "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  private _players: PlayerType[] = [];
  private _trainings: TrainingType[];

  constructor(data: TeamType) {
    this._name = data.name;
    this._coach = data.coach;
    this._assistant = data.assistant;
    this._img =
      data.img ||
      "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    this._players = data.players;
    this._trainings = data.trainings;
  }

  get name() {
    return this._name;
  }
  get trainings() {
    return this._trainings;
  }

  get coach() {
    return this._coach;
  }

  get assistant() {
    return this._assistant;
  }

  get img() {
    return this._img;
  }

  get players() {
    return this._players;
  }

  set players(data: PlayerType[]) {
    this._players = data.filter((player) => player.team.includes(this._name));
  }
}

export class Gym {
  private _name: string;
  private _address: string;
  private _img?: string;
  private _maps?: string;

  constructor(gym: GymType) {
    this._name = gym.name;
    this._address = gym.address;
    this._img = gym.img;
    this._maps = gym.maps;
  }

  get name() {
    return this._name;
  }

  get maps() {
    return this._maps;
  }

  planning(teams: TeamType[]) {
    const planning: TrainingType[] = [];

    teams.forEach((team) => {
      const creneaux = team.trainings;
      creneaux.forEach((creneau) => {
        if (creneau.gym === this._name) {
          planning.push({ ...creneau, team: team.name });
        }
      });
    });
    return planning;
  }

  get address() {
    return this._address;
  }

  get img() {
    return this._img;
  }
}
