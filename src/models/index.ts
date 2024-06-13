import { TeamType, TrainingType, GymType, LeadershipType, NewsType } from "@/types";
import { IsEmail, IsString, Length, IsOptional, IsBoolean, IsArray, IsNumber } from "class-validator";
import { v4 as uuidv4 } from "uuid";

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
    return this._teams;
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

export class News {
  @IsNumber()
  private _id: number;

  @IsString()
  private _title: string;

  @IsString()
  private _date: string;

  @IsOptional()
  @IsString()
  private _img?: string;

  @IsString()
  private _url: string;

  @IsOptional()
  @IsString()
  private _rank?: "primary" | "secondary";

  @IsArray()
  private _content: string[] = [];

  constructor(data: NewsType) {
    this._id = data.id;
    this._title = data.title;
    this._date = data.date;
    this._img = data.img;
    this._url = data.url;
    this._rank = data.rank;
    this._content = data.content;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string[] {
    return this._content;
  }

  get date(): Date {
    return new Date(Utils.parseDate(this._date));
  }

  get img(): string {
    return this._img ?? "/images/default/news.avif";
  }

  get url(): string {
    return this._url;
  }

  get isMain(): boolean {
    return this._rank === "primary";
  }

  get isSecondary(): boolean {
    return this._rank === "secondary";
  }

  static lastFour(array: News[]): News[] {
    const sortedArray = array.toSorted((a, b) => b.date.getTime() - a.date.getTime());
    const filteredArray = sortedArray.filter((item) => !item.isMain && !item.isSecondary);
    console.log(filteredArray);
    return filteredArray.slice(0, 4);
  }

  static main(array: News[]): News {
    return array.find((item) => item.isMain) ?? array[0];
  }

  static secondary(array: News[]): News {
    return array.find((item) => item.isSecondary) ?? array[1];
  }
}

export class Team implements TeamType {
  @IsString()
  private _name: string;

  @IsNumber()
  private _id: string;

  @IsOptional()
  @IsString()
  private _coach?: string;

  @IsOptional()
  @IsString()
  private _img: string;

  @IsArray()
  private _trainings: TrainingType[];

  @IsBoolean()
  private _isChampionship: boolean;

  @IsOptional()
  @IsString()
  private _division: string;

  constructor(data: TeamType) {
    this._name = data.name;
    this._coach = data.coach;
    this._img = data.img ?? "/images/default/equipes.avif";
    this._trainings = data.trainings;
    this._isChampionship = data.isChampionship ?? false;
    this._division = data.division ?? "Départementale";
    this._id = data.id ?? uuidv4(); // Generate UUID if no ID is provided
  }
  get name(): string {
    return this._name;
  }

  get trainings(): TrainingType[] {
    return this._trainings;
  }

  get img(): string {
    return this._img;
  }

  get isTeamImage() {
    return this._img === "/images/default/equipes.avif";
  }

  get id(): string {
    return this._id;
  }
  get coach(): string | undefined {
    return this._coach;
  }

  get isChampionship(): boolean {
    return this._isChampionship;
  }

  get division(): string {
    return this._division;
  }

  set coach(name: string) {
    this._coach = name;
  }
}

export class Gym implements GymType {
  @IsNumber()
  private _id: string;

  @IsString()
  private _name: string;

  @IsString()
  private _address: string;

  @IsString()
  private _city: string;

  @IsString()
  private _postalCode: string;

  @IsString()
  @Length(10, 13)
  private _phone: string;

  @IsOptional()
  @IsString()
  private _img?: string;

  @IsArray()
  private _available: string[];

  @IsArray()
  private _slots: TrainingType[] = [];

  @IsNumber()
  private _lat: number;
  private _lng: number;

  constructor(gym: GymType) {
    this._id = gym.id ?? uuidv4();
    this._name = gym.name;
    this._address = gym.address;
    this._img = gym.img;
    this._city = gym.city;
    this._postalCode = gym.postalCode;
    this._phone = gym.phone;
    this._available = gym.available;
    this._lat = gym.lat;
    this._lng = gym.lng;
  }

  get id(): string {
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

  get lat(): number {
    return this._lat;
  }

  get lng(): number {
    return this._lng;
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

  get available(): string[] {
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

export class Utils {
  static parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Les mois sont 0-indexés en JavaScript
  }
  static formatPhoneNumber(number: string) {
    return number.replace(/(\d{2})(?=\d)/g, "$1.");
  }

  static formatDate(data: Date, options?: Intl.DateTimeFormatOptions): string {
    if (!(data instanceof Date) || isNaN(data.getTime())) {
      throw new Error("Invalid Date");
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    const formatOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

    return data.toLocaleDateString("fr-FR", formatOptions).toUpperCase();
  }
}

export class Document {
  @IsString()
  private _id: string;

  @IsString()
  private _title: string;

  @IsString()
  private _url: string;

  constructor(document: { id?: string; title: string; url: string }) {
    this._id = document.id ?? uuidv4();
    this._title = document.title;
    this._url = document.url;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get url(): string {
    return this._url;
  }
}
