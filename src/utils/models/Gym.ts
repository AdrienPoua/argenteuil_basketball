import { v4 as uuidv4 } from "uuid";
import { GymType, TrainingType, TeamType } from "@/utils/types";
import { Team } from "@/utils/models";

export default class Gym implements GymType {
  private _id: string;
  private _name: string;
  private _address: string;
  private _city: string;
  private _zipcode: string;
  private _phone: string;
  private _img?: string;
  private _available: string[];
  private _slots: TrainingType[] = [];

  constructor(gym: GymType) {
    this._id = gym.id ?? uuidv4();
    this._name = gym.name;
    this._address = gym.address;
    this._img = gym.img;
    this._city = gym.city;
    this._zipcode = gym.zipcode;
    this._phone = gym.phone;
    this._available = gym.available;
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

  get zipcode(): string {
    return this._zipcode;
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
    return `${this._address}, ${this._zipcode} ${this._city}`;
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
