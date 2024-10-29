type Correspondant = {
  name: string;
  email: string;
  number: string;
};
type Constructor = {
  name: string;
  correspondant: Correspondant;
  _id: string;
};

export default class Club {
  private readonly _name: string;
  private readonly _correspondant: Correspondant;
  private readonly _id: string;

  constructor(data: Constructor) {
    this._name = data.name;
    this._correspondant = data.correspondant;
    this._id = data._id;
  }

  get name(): string {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get correspondant() {
    return this._correspondant;
  }
}
