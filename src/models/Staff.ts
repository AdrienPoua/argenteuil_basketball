export type ConstructorType = {
  name: string;
  number: { number: string; visible: boolean };
  email: { email: string; visible: boolean };
  image: string | null;
  id: string;
};

export default class Staff {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _number: { number: string; visible: boolean };
  private readonly _email: { email: string; visible: boolean };
  private readonly _image: string;

  constructor(data: ConstructorType) {
    this._id = data.id;
    this._name = data.name ?? "Undefined";
    this._number = data.number ?? { number: "0670222238", visible: true };
    this._email = data.email ?? { email: "argenteuilbasketball@hotmail.fr", visible: true };
    this._image = data.image ? data.image : "/images/default/avatar.png";
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get number() {
    return this._number;
  }

  get email() {
    return this._email;
  }

  get image(): string {
    return this._image;
  }
}
