import { Prisma } from "@prisma/client";
import { SessionSchema } from "@/database/schemas/Team";

type ConstructorType = Prisma.TeamGetPayload<{
  include: { coach: true };
}>;

export default class Team {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _coach: Prisma.MemberGetPayload<{}> | null;
  private readonly _image: string | null;
  private readonly _sessions: Prisma.JsonValue;
  private readonly _level: string;
  private readonly _isCompetition: boolean;
  constructor(data: ConstructorType) {
    this._name = data.name;
    this._coach = data.coach;
    this._image = data.image;
    this._id = data.id;
    this._sessions = data.sessions;
    this._level = data.level;
    this._isCompetition = data.isCompetition ;
  }

  get id() {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get sessions() {
    return Array.isArray(this._sessions)
      ? this._sessions.map((session) => SessionSchema.parse(session))
      : [];
  }

  get isCompetition() {
    return this._isCompetition;
  }

  get level() {
    return this._level;
  }

  get image() {
    return this._image ?? "/images/default/equipes.avif";
  }
  get coach() {
    return this._coach || undefined;
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      coach: this.coach,
      sessions: this.sessions,
      level: this.level,
      isCompetition: this.isCompetition,
    };
  }
}
