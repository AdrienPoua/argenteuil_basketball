import { IsString, IsArray, IsEmail, Length } from 'class-validator';

export default class Club {
    @IsString()
    private _name: string;
  
    @IsString()
    private _city: string;
  
    @IsString()
    private _postalCode: string;
  
    @IsString()
    private _address: string;
  
    @IsArray()
    private _colors: string[];
  
    @IsEmail()
    private _email: string;
  
    @IsString()
    @Length(10, 13)
    private _phone: string;
  
    @IsString()
    private _logo: string;
  
    @IsString()
    private _saison: string;
  
    constructor(data: {
      name: string;
      city: string;
      postalCode: string;
      address: string;
      colors: string[];
      email: string;
      phone: string;
      logo: string;
      saison: string;
    }) {
      this._name = data.name;
      this._city = data.city;
      this._postalCode = data.postalCode;
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
  
    get postalCode(): string {
      return this._postalCode;
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
      return `${this._address}, ${this._postalCode} ${this._city}`;
    }
  }
  