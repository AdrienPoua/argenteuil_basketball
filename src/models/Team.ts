import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { daySchema, gymSchema } from "../database/schemas/Session";
import Member from "./Member";

type ConstructorType = {
  id: string;
  name: string;
  image: string | null;
  level: string;
  sessions: SessionType[];
  coachs: ConstructorParameters<typeof Member>[];
};

type SessionType = {
  start: string;
  end: string;
  day: z.infer<typeof daySchema>;
  gym: z.infer<typeof gymSchema>;
};

export default class Team {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _coachs: Member[];
  private readonly _image: string | null;
  private readonly _sessions: SessionType[];

  constructor(data: ConstructorType) {
    this._name = data.name;
    this._coachs = data.coachs.map((coach) => new Member(...coach));
    this._image = data.image;
    this._id = data.id;
    this._sessions = data.sessions;
  }

  get id() {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get sessions() {
    return this._sessions;
  }

  get image() {
    return this._image ?? "/images/default/equipes.avif";
  }
  get coachs() {
    return this._coachs;
  }
}

