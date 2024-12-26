import { z } from "zod";
import Team from "./Team";
import { typeSchema } from "@/database/schemas/Member";

export type ConstructorType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isPublicEmail: boolean;
  isPublicPhone: boolean;
  isLeader: boolean;
  type: Array<z.infer<typeof typeSchema>>;
  image: string | null;
  teams: ConstructorParameters<typeof Team>;
};

export const TeamSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
  level: z.string().default("Departemental"),
  sessions: z.array(z.object({ id: z.string() })),
  coachs: z.array(z.object({ id: z.string() })),
});


export default class Member {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _phone: string;
  private readonly _email: string;
  private readonly _image: string | null;
  private readonly _isPublicEmail: boolean;
  private readonly _isPublicPhone: boolean;
  private readonly _isLeader: boolean;
  private readonly _type: Array<z.infer<typeof typeSchema>>;
  private readonly _teams: Team[];

  constructor(data: ConstructorType) {
    this._id = data.id;
    this._name = data.name;
    this._phone = data.phone;
    this._email = data.email;
    this._image = data.image;
    this._isPublicEmail = data.isPublicEmail;
    this._isPublicPhone = data.isPublicPhone;
    this._isLeader = data.isLeader;
    this._type = data.type;
    this._teams = data.teams.map((team) => new Team(team));
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

  get image() {
    return this._image ?? "/images/default/avatar.png";
  }
  get teams() {
    return this._teams;
  }

  get isLeader() {
    return this._isLeader;
  }

  get type() {
    return this._type.map((type) => type.replace("_", " "));
  }
}
