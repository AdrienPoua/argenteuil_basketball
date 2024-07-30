import { LeadershipType } from "@/utils/types";

export default class Leadership implements LeadershipType {
  private _name: string;
  private _number: string;
  private _email: string;
  private _img?: string;
  private _teams?: string[];
  private _job?: string;
  private _isEmailDisplayed: boolean;
  private _isNumberDisplayed: boolean;
  private _isLeader: boolean;
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
    return this._img ?? "/images/default/avatar.png";
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
