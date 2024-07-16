import { MemberType } from "@/utils/types";
import allCategories from "@/data/categories.json";

export default class Member {
  private _name: string;
  private _firstName: string;
  private _email: string;
  private _birthday: string;
  private _year: string;
  private _statut: string;
  private _id: string;

  constructor(data: MemberType) {
    this._name = data.Nom;
    this._firstName = data.Prénom;
    this._email = data["E-mail"];
    this._birthday = data["Date de naissance"];
    this._statut = data.Statut;
    this._year = "";
    this._id = "";
  }

  get name(): string {
    return this._name;
  }

  setYear() {
    const actualYear = new Date().getFullYear();
    const beforeFirstOfJuly = new Date().getMonth() < 6;
    this._year = beforeFirstOfJuly ? (actualYear - 1).toString() : actualYear.toString();
  }

  set id(id: string) {
    this._id = id;
  }

  get year(): string {
    return this._year;
  }

  get firstName(): string {
    return this._firstName;
  }

  get email(): string {
    return this._email;
  }

  get birthday(): string {
    return this._birthday;
  }

  get statut(): string {
    return this._statut;
  }

  toObject() {
    return {
      name: this.name,
      firstName: this.firstName,
      email: this.email,
      birthday: this.birthday,
      statut: this.statut,
      year: this.year,
      categorie: this.categorie,
    };
  }

  get categorie(): string {
    const birthYear = this._birthday.split("/")[2];
    const category = allCategories.find((item) => item.year.includes(birthYear));
    if (parseInt(birthYear) <= 2004) {
      return "Seniors";
    } else if (category) {
      return category.division;
    } else {
      throw new Error("Invalid birth year");
    }
  }
}
