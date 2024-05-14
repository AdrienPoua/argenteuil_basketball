import {NavLinkModel, NavDropdownModel, Member, Coach, Leader } from "@/models";

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
  static leaderRoles = ["Président", "Présidente", "Vice-président", "Vice-présidente", "Secrétaire", "Trésorier", "Trésorière", "Correspondant","Correspondante", "Webmaster"];

  static create(data) {
    if (data.role === "Coach") {
      return new Coach(data);
    } else if (MemberFactory.leaderRoles.includes(data.role)) {
      return new Leader(data);
    } else {
      return new Member(data);
    }
  }
}
