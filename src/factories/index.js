import {
  Team,
  Coach,
  Leader,
  Player,
  NavItemModel,
} from "@/models";

export class NavFactory {
  static create(data) {
    return new NavItemModel(data);
  }
}
export class MemberFactory {
  static create(data, type) {
    if (type === "coach" && data.coach) {
      return new Coach(data);
    } else if (type === "leader" && data.leader) {
      return new Leader(data);
    } else if (type === "player" && data.player) {
      return new Player(data);
    } else if (type === "team" && data.coach) {
      return new Team(data);
    } else {
      return null;
    }
  }
}
