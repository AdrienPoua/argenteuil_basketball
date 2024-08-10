import Staff from "@/utils/models/Staff";
import { CoachType, StaffPropsType } from "@/utils/types";

export type CoachPropsType = {
  teams: string[];
} & StaffPropsType;

export default class Coach extends Staff implements CoachType {
  private _teams: string[];
  constructor(data: CoachPropsType) {
    super(data);
    this._teams = data.teams;
  }
  get teams(): string[] {
    return this._teams;
  }
}
