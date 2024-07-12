import { IsArray, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import { GymType, TrainingType, TeamType } from "@/types";
import Team from "@/models/Team";

export default class Gym implements GymType {
    @IsString()
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
      return this._lat || 0;
    }
  
    get lng(): number {
      return this._lng || 0;
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
  