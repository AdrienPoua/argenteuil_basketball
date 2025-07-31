export class MemberEntity implements Member {
  private readonly _id: string;
  private readonly _first_name: string;
  private readonly _last_name: string;
  private readonly _email: string;
  private readonly _phone: string;
  private readonly _role: MemberRole[];
  private readonly _image?: string;
  private readonly _contact_privacy: ContactPrivacy;
  private readonly _created_at: string;
  constructor(data: Member) {
    this._id = data.id;
    this._first_name = data.first_name;
    this._last_name = data.last_name;
    this._email = data.email;
    this._phone = data.phone;
    this._role = data.role;
    this._image = data.image;
    this._contact_privacy = data.contact_privacy;
    this._created_at = data.created_at;
  }

  get id(): string {
    return this._id;
  }
  get first_name(): string {
    return this._first_name;
  }
  get last_name(): string {
    return this._last_name;
  }
  get email(): string {
    return this._email;
  }
  get phone(): string {
    return this._phone;
  }
  get role(): MemberRole[] {
    return this._role;
  }
  get image(): string | undefined {
    return this._image;
  }
  get contact_privacy(): ContactPrivacy {
    return this._contact_privacy;
  }
  get created_at(): string {
    return this._created_at;
  }

  toObject() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      image: this.image,
      contact_privacy: this.contact_privacy,
      created_at: this.created_at,
    };
  }
}

export enum MemberRole {
  President = 'Président',
  VicePresident = 'Vice-Président',
  Treasurer = 'Trésorière',
  Secretary = 'Secrétaire',
  Correspondant = 'Correspondant',
  Coach = 'Coach',
  Member = 'Membre',
  Arbitre = 'Arbitre',
  OTM = 'OTM',
  Other = 'Autre',
}

export interface ContactPrivacy {
  showEmail: boolean;
  showPhone: boolean;
}
export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: MemberRole[];
  image?: string;
  contact_privacy: ContactPrivacy;
  created_at: string;
}
