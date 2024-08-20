export type Constructor = {
  name: string;
  number: string;
  email: string;
  img?: string;
  isEmailDisplayed?: boolean;
  isNumberDisplayed?: boolean;
};

export default class Staff {
  private _name: string;
  private _number: string;
  private _email: string;
  private _img: string;
  private _isEmailDisplayed: boolean;
  private _isNumberDisplayed: boolean;

  constructor(data: Constructor) {
    this._name = data.name;
    this._number = data.number;
    this._email = data.email;
    this._img = data.img ?? "/images/default/avatar.png";
    this._isEmailDisplayed = data.isEmailDisplayed ?? true;
    this._isNumberDisplayed = data.isNumberDisplayed ?? true;
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get number(): string {
    return this._number;
  }

  get email(): string {
    return this._email;
  }

  get img(): string {
    return this._img;
  }

  get isEmailDisplayed(): boolean {
    return this._isEmailDisplayed;
  }

  get isNumberDisplayed(): boolean {
    return this._isNumberDisplayed;
  }
}
