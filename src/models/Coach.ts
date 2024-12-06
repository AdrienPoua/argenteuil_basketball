import Staff, {
  Constructor as ExtentedConstructor,
} from "@/models/Staff";

type Constructor = {
  teams: string[];
} & ExtentedConstructor;

export default class Coach extends Staff {
  private readonly _teams: string[];

  constructor(data: Constructor) {
    super(data);
    this._teams = data.teams;
  }

  get teams(): string[] {
    return this._teams;
  }
}
