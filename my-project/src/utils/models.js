export class Match {
  constructor(data) {
    this._division = data.Division;
    this._number = data["N° de match "];
    this._teamA = data["Equipe 1"];
    this._teamB = data["Equipe 2"];
    this._date = data["Date de rencontre"];
    this._gym = data.Salle;
  }

  get date() {
    return this._date;
  }

  USA_DATE() {
    const [day, month, year] = this._date.split("/");
    return `${year}/${month}/${day}`;
  }

  get stringDate() {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return new Date(this.USA_DATE()).toLocaleDateString("fr-FR", options);
  }

  isMatchToday() {
    const today = new Date();
    const matchDate = new Date(this.USA_DATE());
    return matchDate.toDateString() === today.toDateString();
  }
}
