import Staff from "@/utils/models/Staff";
import { Constructor as ExtendingConstructor } from "@/utils/models/Staff";

type Constructor = {
  job: string;
  teams?: string[];
} & ExtendingConstructor;
export default class Leader extends Staff {
  private _teams?: string[];
  private _job: string;
  constructor(data: Constructor) {
    super(data);
    this._teams = data.teams;
    this._job = data.job;
  }

  get teams(): string[] | undefined {
    return this._teams;
  }

  get job(): string {
    return this._job;
  }
}
