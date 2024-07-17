export default class Club {
  private _name: string;
  private _city: string;
  private _zipcode: string;
  private _address: string;
  private _colors: string[];
  private _email: string;
  private _phone: string;
  private _logo: string;
  private _saison: string;
  
  constructor(data: {
    name: string;
    city: string;
    zipcode: string;
    address: string;
    colors: string[];
    email: string;
    phone: string;
    logo: string;
    saison: string;
  }) {
    this._name = data.name;
    this._city = data.city;
    this._zipcode = data.zipcode;
    this._address = data.address;
    this._colors = data.colors;
    this._email = data.email;
    this._phone = data.phone;
    this._logo = data.logo;
    this._saison = data.saison;
  }

  get name(): string {
    return this._name;
  }

  get city(): string {
    return this._city;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get address(): string {
    return this._address;
  }

  get colors(): string[] {
    return this._colors;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get logo(): string {
    return this._logo;
  }

  get saison(): string {
    return this._saison;
  }

  getFullAddress(): string {
    return `${this._address}, ${this._zipcode} ${this._city}`;
  }
}
