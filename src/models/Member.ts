import { MemberType } from "@/types";
import cat from "@/data/cat.json";

export default class Member {
    private _name: string;
    private _firstName: string;
    private _email: string;
    private _birthday: string;
    private _year: string;
    private _statut: string;
  
    constructor(data: MemberType) {
      this._name = data.Nom;
      this._firstName = data.Prénom;
      this._email = data["E-mail"];
      this._birthday = data["Date de naissance"];
      this._statut = data.Statut;
      this._year = "2023";
    }
  
    get name(): string {
      return this._name;
    }
  
    set year(year: string) {
      this._year = year;
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
        categorie: this.categorie
      };
    }
  
    get categorie(): string {
      const birthYear = this._birthday.split("/")[2];
      const category = cat.find((item) => item.year.includes(birthYear));
      if (parseInt(birthYear) <= 2004 ) {
        return "Adultes"
      } else if (category) {
        return category.category;
      } else {
        throw new Error("Invalid birth year");
      }
    }
  }
  