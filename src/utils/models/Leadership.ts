import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Length } from "class-validator";
import { LeadershipType } from "@/utils/types";

export default class Leadership implements LeadershipType {
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
  