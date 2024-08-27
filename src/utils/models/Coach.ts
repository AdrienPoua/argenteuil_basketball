import Staff from "@/utils/models/Staff";
import { Constructor as ExtentedConstructor } from "@/utils/models/Staff";

type Constructor = {
  teams: string[];
} & ExtentedConstructor;

export default class Coach extends Staff {
  private _teams: string[];
  constructor(data: Constructor) {
    super(data);
    this._teams = data.teams;
  }
  get teams(): string[] {
    return this._teams;
  }
}