import { v4 as uuidv4 } from "uuid";
import { TrainingType, TeamType } from "@/utils/types";

export default class Team implements TeamType {
  private _name: string;
  private _id: string;
  private _coach?: string;
  private _img: string;
  private _trainings: TrainingType[];
  private _isChampionship: boolean;
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
    return this._img !== "/images/default/equipes.avif";
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