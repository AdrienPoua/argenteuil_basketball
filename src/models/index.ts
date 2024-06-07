import { TeamType, PlayerType, AssistantType, TrainingType, GymType, LeadershipType } from "@/types";
import staff from "@/data/leadership.json";
import { IsEmail, IsString, Length, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class Leadership implements LeadershipType {
  @IsString()
  @Length(1)
  private _name: string;

  @IsString()
  @Length(10, 13)
  private _number: string;

  @IsEmail()
  private _email: string;

  @IsOptional({})
  @IsString()
  private _img?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  private _teams?: string[];

  @IsOptional()
  @IsString()
  private _job?: string;

  @IsBoolean()
  private _isEmailDisplayed: boolean;

  @IsBoolean()
  private _isNumberDisplayed: boolean;

  @IsBoolean()
  private _isLeader: boolean;

  @IsBoolean()
  private _isCoach: boolean;

  constructor(data: LeadershipType) {
    this._name = data.name; 
    this._number = data.number; 
    this._email = data.email; 
    this._img = data.img; 
    this._teams = data.teams; 
    this._job = data.job;
    this._isEmailDisplayed = data.isEmailDisplayed === true;
    this._isNumberDisplayed = data.isNumberDisplayed === true;
    this._isLeader = data.isLeader === true;
    this._isCoach = data.isCoach === true;
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get number(): string {
    return this._number;
  }

  get email(): string {
    return this._email;
  }

  get img(): string {
    if (this._img) {
      return this._img;
    } else if (this.isLeader) {
      return "/images/default/leader.avif";
    } else if (this.isCoach) {
      return "/images/default/coach.avif";
    } else {
      return "/images/default/avatar.webp";
    }
  }

  get teams(): string[] | undefined {
    return this._teams
  }

  get job(): string | undefined {
    return this._job;
  }

  get isEmailDisplayed(): boolean {
    return this._isEmailDisplayed;
  }

  get isNumberDisplayed(): boolean {
    return this._isNumberDisplayed;
  }

  get isLeader(): boolean {
    return this._isLeader;
  }

  get isCoach(): boolean {
    return this._isCoach;
  }
}
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

export class News {
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

export class Team implements TeamType {
  private _name: string;
  private _coach?: string;
  private _assistant: AssistantType[];
  private _img: string;
  private _players: PlayerType[] = [];
  private _trainings: TrainingType[];

  constructor(data: TeamType) {
    this._name = data.name;
    this._coach = data.coach;
    this._assistant = data.assistant;
    this._img = data.img || "/images/default/equipes.avif";
    this._trainings = data.trainings;
  }

  get name() {
    return this._name;
  }
  get isTeamImage() {
    return this._img === "/images/default/equipes.avif";
  }

  get trainings() {
    return this._trainings;
  }

  get coach() {
    const findCoach = () => {
      return staff.find((member) => member.team?.includes(this._name));
    };
    const coach = findCoach();
    if (coach) {
      return coach.name;
    } else {
      return this._coach;
    }
  }

  get assistant() {
    return this._assistant;
  }

  get img() {
    return this._img ?? "/images/default/equipes.avif";
  }

  get players() {
    return this._players;
  }

  set players(data: PlayerType[]) {
    this._players = data.filter((player) => player.team.includes(this._name));
  }
}

export class Gym implements GymType {
  private _id: number;
  private _name: string;
  private _address: string;
  private _city: string;
  private _postalCode: string;
  private _phone: string;
  private _img?: string;
  private _available: DaysType[];
  private _slots: TrainingType[] = [];

  constructor(gym: GymType) {
    this._id = gym.id;
    this._name = gym.name;
    this._address = gym.address;
    this._img = gym.img;
    this._city = gym.city;
    this._postalCode = gym.postalCode;
    this._phone = gym.phone;
    this._available = gym.available;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get city(): string {
    return this._city;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): string {
    return this._address;
  }

  get img(): string {
    return this._img ?? "/images/default/gymnase.avif";
  }

  get available(): DaysType[] {
    return this._available;
  }

  getFullAddress(): string {
    return `${this._address}, ${this._postalCode} ${this._city}`;
  }

  addTrainingSlot(training: TrainingType): void {
    if (training.gym !== this._name) {
      throw new Error("Training gym does not match this gym");
    }
    this._slots.push(training);
  }

  removeTrainingSlot(index: number): void {
    if (index < 0 || index >= this._slots.length) {
      throw new Error("Invalid index");
    }
    this._slots.splice(index, 1);
  }

  planning(teams: TeamType[]): TrainingType[] {
    const isMyGym = (creneau: TrainingType): boolean => creneau.gym === this._name;
    return teams.flatMap((team: TeamType) => {
      return team.trainings.filter(isMyGym).map((creneau: TrainingType) => ({
        ...creneau,
        team: team.name,
      }));
    });
  }

  set slots(data: Team[]) {
    this._slots = this.planning(data);
  }

  get slots(): TrainingType[] {
    return this._slots;
  }
}
