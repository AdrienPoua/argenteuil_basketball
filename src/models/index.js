export class Match {
  constructor(data) {
    this._division = data.Division;
    this._number = data["N° de match "];
    this._teamA = data["Equipe 1"];
    this._teamB = data["Equipe 2"];
    this._date = data["Date de rencontre"];
    this._gym = data.Salle;
    this._time = data.Heure;
    this._cancel = data.cancel || false;
  }

  get date() {
    return Utils.USA_DATE(this._date);
  }
  get time() {
    return this._time;
  }

  get cancel() {
    return this._cancel;
  }

  get number() {
    return this._number;
  }
  get division() {
    return this._division.split("-")[0];
  }
  get teamA() {
    return this._teamA;
  }
  get teamB() {
    return this._teamB;
  }
  get gym() {
    return this._gym;
  }


  isMatchToday() {
    const today = new Date();
    const matchDate = new Date(this.USA_DATE());
    return matchDate.toDateString() === today.toDateString();
  }
}

export class NewsModel {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._date = data.date;
    this._img = data.img;
    this._url = data.url;
    this._main = data.main;
    this._secondary = data.secondary;
  }

  // Getters
  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get date() {
    return Utils.USA_DATE(this._date);
  }

  get img() {
    return this._img;
  }

  get url() {
    return this._url;
  }

  get main() {
    return this._main;
  }

  get secondary() {
    return this._secondary;
  }


  static sortByDate(array) {
    return array.sort((a, b) => {
      const dateA = new Date(Utils.USA_DATE(a.date));
      const dateB = new Date(Utils.USA_DATE(b.date));
      return dateB - dateA;
    });
  }
}

export class Utils {
  static USA_DATE(frenchDate) {
    const [day, month, year] = frenchDate.split("/");
    return `${year}/${month}/${day}`;
  }
  static dateString(data) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return new Date(data)
      .toLocaleDateString("fr-FR", options)
      .toUpperCase();
  }
}

export class NavLinkModel {
  constructor(data) {
    this._title = data.title;
    this._url = data.url;
  }
  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
}

export class NavDropdownModel {
  constructor(data) {
    this._title = data.title;
    this._subItems = data.subItems;
  }
  static create(subitems){
    return subitems.map(subitem => new SubNavItem(subitem));
  }
  get title() {
    return this._title;
  }
  get subItems() {
    return this._subItems;
  }

  
}

export class SubNavItem {
  constructor(data) {
    this._title = data.title;
    this._url = data.url;
  }
  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
}

export class Member {
  constructor(data) {
    this._name = data.name;
    this._role = data.role;
    this._img = data.img;
    this._email = data.email;
    this._number = data.number;
  }
  get name() {
    return this._name;
  }
  get img() {
    return this._img;
  }
  get email() {
    return this._email;
  }
  get number() {
    return this._number;
  }
  get role() {
    return this._role;
  }
}
export class Coach extends Member {
  constructor(data) {
    super(data);
    this._role = "Coach";
    this._team = data.team;
  }
  get team() {
    return this._team;
  }
}

export class Leader extends Member {
  constructor(data) {
    super(data);
    this.leader = true
  }
}