
type Member = {
  name: string;
  role: string;
  email: string;
  number: string;
};
type Constructor = {
  name: string;
  members: Member[];
  _id : string;
};

export default class Club {
  private _name: string;
  private _members: Member[];
  private _id : string;

  constructor(data: Constructor) {
    this._name = data.name
    this._members = data.members;
    this._id = data._id
  }

  get name(): string {
    return this._name;
  }

  get members(): Member[] {
    return this._members;
  }

  get id() {
    return this._id
  }
  get president(): Member | undefined {
    return this._members.find((member) => member.role?.toLowerCase().includes("président"));
  }

  get correspondant(): Member | undefined {
    return this._members.find((member) => member.role?.toLowerCase().includes("correspondant"));
  }
}
