import { v4 as uuidv4 } from "uuid";
import { Team } from "@/models";

type Slots = {
  team?: string;
  day: string;
  start: string;
  end: string;
  gym: string;
};

type Constructor = {
  id: string;
  name: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  img?: string;
  available: string[];
};
export default class Gym {
  private _id: string;
  private _name: string;
  private _address: string;
  private _city: string;
  private _zipcode: string;
  private _phone: string;
  private _img?: string;
  private _available: string[];
  private _slots: Slots[] = [];

  constructor(data: Constructor) {
    this._id = data.id ?? uuidv4();
    this._name = data.name;
    this._address = data.address;
    this._img = data.img;
    this._city = data.city;
    this._zipcode = data.zipcode;
    this._phone = data.phone;
    this._available = data.available;
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

  addTrainingSlot(training: Slots): void {
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

  planning(teams: Team[]): Slots[] {
    const isMyGym = (creneau: Slots): boolean => creneau.gym === this._name;
    return teams.flatMap((team: Team) => {
      return team.trainings.filter(isMyGym).map((creneau: Slots) => ({
        ...creneau,
        team: team.name,
      }));
    });
  }

  set slots(data: Team[]) {
    this._slots = this.planning(data);
  }

  get slots(): Slots[] {
    return this._slots;
  }
}
