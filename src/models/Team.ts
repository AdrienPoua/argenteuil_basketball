import { Prisma } from "@prisma/client";

type ConstructorType = Prisma.TeamGetPayload<{
  include: { coach: true; sessions: { include: { session: true } } };
}>;

export default class Team {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _coach: Prisma.MemberGetPayload<{}> | null;
  private readonly _image: string | null;
  private readonly _sessions: Prisma.SessionGetPayload<{}>[];

  constructor(data: ConstructorType) {
    this._name = data.name;
    this._coach = data.coach;
    this._image = data.image;
    this._id = data.id;
    this._sessions = data.sessions.map((teamOnSession) => teamOnSession.session);
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
  get coach() {
    return this._coach;
  }
}
