
type Member = {
  name: string;
  role: string;
  email: string;
  number: string;
};
type Constructor = {
  name: string;
  members: Member[];
};

export default class Club {
  private _name: string;
  private _members: Member[];

  constructor(data: Constructor) {
    this._name = data.name
    this._members = data.members;
  }

  get name(): string {
    return this._name;
  }

  get members(): Member[] {
    return this._members;
  }

  get president(): Member | undefined {
    return this._members.find((member) => member.role?.toLowerCase().includes("président"));
  }

  get correspondant(): Member | undefined {
    return this._members.find((member) => member.role?.toLowerCase().includes("correspondant"));
  }
}
