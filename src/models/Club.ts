import { Prisma } from '@prisma/client';

type ConstructorType = Prisma.ClubGetPayload<{}>;
export default class ClubService {
  private readonly _id: string;
  private readonly _code: string;
  private readonly _libelle: string;
  private readonly _email: string | null;
  private readonly _phone: string | null;

  constructor(data: ConstructorType) {
    this._id = data.id;
    this._code = data.code;
    this._libelle = data.libelle;
    this._email = data.email;
    this._phone = data.phone;
  }
  get id(): string {
    return this._id;
  }
  get code(): string {
    return this._code;
  }
  get libelle(): string {
    return this._libelle.split('-')[0];
  }
  get email(): string {
    return this._email ?? "Pas d'email";
  }
  get phone(): string {
    return this._phone ?? 'Pas de numéro';
  }

  toPlainObject() {
    return {
      id: this.id,
      code: this.code,
      libelle: this.libelle,
      email: this.email,
      phone: this.phone,
    };
  }
}
