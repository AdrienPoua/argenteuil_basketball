import Staff from "@/utils/models/Staff";
import { StaffPropsType, LeaderType } from "@/utils/types";

export type LeaderPropsType = {
  job: string;
  teams?: string[];
} & StaffPropsType;

export default class Leader extends Staff implements LeaderType {
  private _teams?: string[];
  private _job: string;
  constructor(data: LeaderPropsType) {
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
