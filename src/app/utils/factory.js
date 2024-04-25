import {NavItem} from "./models";
import {NavItemMenu} from "./models";

export class NavFactory {
  static create(data) {
    if (data.url) {
      return new NavItem(data);
    } else {
      return new NavItemMenu(data);
    }
  }
}
