import Staff, { Constructor as ExtendingConstructor } from "@/utils/models/Staff";

type Constructor = {
  job:  "Président" | "Trésorier" | "Correspondant" | "Secrétaire Général" | "Entraineur" | "",
  teams?: string[];
} & ExtendingConstructor;
export default class Leader extends Staff {
  private readonly _teams?: string[];
  private readonly _job:  "Président" | "Trésorier" | "Correspondant" | "Secrétaire Général" | "Entraineur" | "";
  constructor(data: Constructor) {
    super(data);
    this._teams = data.teams;
    this._job = data.job;
  }

  get teams(): string[] | undefined {
    return this._teams;
  }

  get job() {
    return this._job;
  }
}
