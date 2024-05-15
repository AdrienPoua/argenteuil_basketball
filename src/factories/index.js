import {
  NavLinkModel,
  NavDropdownModel,
  Member,
  Coach,
  Leader,
  Player,
} from "@/models";

export class NavFactory {
  static create(data) {
    if (data.url) {
      return new NavLinkModel(data);
    } else {
      return new NavDropdownModel(data);
    }
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
    } else {
      return new Member(data);
    }
  }
}
