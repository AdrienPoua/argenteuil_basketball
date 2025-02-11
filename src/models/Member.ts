import { Prisma, Roles, Team } from '@prisma/client';
import { TeamSchema } from '@/lib/validation/Team';
import { IdSchema } from '@/lib/validation/Id';

type ConstructorType = Prisma.MemberGetPayload<{
  include: { teams: true };
}>;

export default class Member {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _phone: string;
  private readonly _email: string;
  private readonly _image: string | null;
  private readonly _isPublicEmail: boolean;
  private readonly _isPublicPhone: boolean;
  private readonly _isLeader: boolean;
  private readonly _role: Array<Roles>;
  private readonly _teams: Array<Team>;

  constructor(data: ConstructorType) {
    this._id = data.id;
    this._name = data.name;
    this._phone = data.phone;
    this._email = data.email;
    this._image = data.image;
    this._isPublicEmail = data.isPublicEmail;
    this._isPublicPhone = data.isPublicPhone;
    this._isLeader = data.isLeader;
    this._role = data.role;
    this._teams = data.teams;
  }

  // Getters
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get phone() {
    return this._isPublicPhone ? this._phone : null;
  }

  get email() {
    return this._isPublicEmail ? this._email : null;
  }

  get privatePhone() {
    return this._phone;
  }

  get privateEmail() {
    return this._email;
  }

  get image() {
    return this._image ?? '/images/default/avatar.png';
  }
  get teams() {
    return this._teams.map((team) => TeamSchema.merge(IdSchema).parse(team));
  }

  get isLeader() {
    return this._isLeader;
  }

  get role() {
    return this._role.map((role) => role.replace('_', ' '));
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      privatePhone: this.privatePhone,
      privateEmail: this.privateEmail,
      image: this.image,
      isLeader: this.isLeader,
      role: this.role,
      teams: this.teams,
    };
  }
}
