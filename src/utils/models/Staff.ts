export type Constructor = {
  name: string;
  number: string;
  email: string;
  image?: string;
  isEmailDisplayed?: boolean;
  isNumberDisplayed?: boolean;
  _id: string;
};

export default class Staff {
  private readonly _name: string;
  private readonly _number: string;
  private readonly _email: string;
  private readonly _img: string;
  private readonly _isEmailDisplayed: boolean;
  private readonly _isNumberDisplayed: boolean;
  private readonly _id : string;

  constructor(data: Constructor) {
    this._name = data.name;
    this._number = data.number;
    this._email = data.email;
    this._img = data.image ? `/images/staff/${data.image}` : "/images/default/avatar.png";
    this._isEmailDisplayed = data.isEmailDisplayed ?? true;
    this._isNumberDisplayed = data.isNumberDisplayed ?? true;
    this._id = data._id;
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

  get id(): string {
    return this._id;
  }

  get isEmailDisplayed(): boolean {
    return this._isEmailDisplayed;
  }

  get isNumberDisplayed(): boolean {
    return this._isNumberDisplayed;
  }
}
