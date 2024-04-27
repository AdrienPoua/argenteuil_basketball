import {NavLinkModel, NavDropdownModel} from "@/models";

export class NavFactory {
  static create(data) {
    if (data.url) {
      return new NavLinkModel(data);
    } else {
      return new NavDropdownModel(data);
    }
  }
}
