export interface Session {
  id: string
  day: string
  start: string
  end: string
  gymnase_id: string
  created_at: string
}

export class SessionEntity implements Session {
  private readonly _id: string
  private readonly _day: string
  private readonly _start: string
  private readonly _end: string
  private readonly _gymnase_id: string
  private readonly _created_at: string

  constructor(data: Session) {
    this._id = data.id
    this._day = data.day
    this._start = data.start
    this._end = data.end
    this._gymnase_id = data.gymnase_id
    this._created_at = data.created_at
  }

  get id(): string {
    return this._id
  }

  get day(): string {
    return this._day
  }

  get start(): string {
    return this._start
  }

  get end(): string {
    return this._end
  }

  get gymnase_id(): string {
    return this._gymnase_id
  }

  get created_at(): string {
    return this._created_at
  }

  toObject(): Session {
    return {
      id: this.id,
      day: this.day,
      start: this.start,
      end: this.end,
      gymnase_id: this.gymnase_id,
      created_at: this.created_at,
    }
  }
}
