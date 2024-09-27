import { v4 as uuidv4 } from "uuid";

type TeamConstructor = {
  name: string;
  trainings: Training[];
  image?: string;
  id?: string;
  coach?: string;
};

type Training = {
  team?: string;
  day: string;
  start: string;
  end: string;
  gym: string;
};

export default class Team {
  private _name: string;
  private _id: string;
  private _coach?: string;
  private _img: string;
  private _trainings: Training[];

  constructor(data: TeamConstructor) {
    this._name = data.name;
    this._coach = data.coach;
    this._img = data.image ? data.image : "/images/default/equipes.avif";
    this._trainings = data.trainings;
    this._id = data.id ?? uuidv4(); // Generate UUID if no ID is provided
  }
  get name(): string {
    return this._name;
  }

  get trainings(): Training[] {
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
  set coach(name: string) {
    this._coach = name;
  }
}

type RankedTeamConstructor = TeamConstructor & { division: string; championship: boolean };
export class RankedTeam extends Team {
  private _division: string;
  private _championship: boolean;

  constructor(data: RankedTeamConstructor) {
    super(data);
    this._division = data.division
    this._championship = data.championship;
  }
  get division(): string {
    return this._division;
  }
  get championship(): boolean {
    return this._championship;
  }
}

export class TeamFactory {
  static createTeam(data: TeamConstructor | RankedTeamConstructor): Team | RankedTeam {
    // Check if data has the properties necessary to create a RankedTeam
    if ('division' in data) {
      return new RankedTeam(data);
    }
    return new Team(data);
  }
}
