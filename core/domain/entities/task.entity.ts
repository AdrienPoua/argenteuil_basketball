export interface Task {
  id: string
  title: string
  done: boolean
  created_at: string
}

export class TaskEntity implements Task {
  private readonly _id: string
  private readonly _title: string
  private readonly _done: boolean
  private readonly _created_at: string

  constructor(data: Task) {
    this._id = data.id
    this._title = data.title
    this._done = data.done
    this._created_at = data.created_at
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get done(): boolean {
    return this._done
  }

  get created_at(): string {
    return this._created_at
  }

  public toObject(): Task {
    return {
      id: this._id,
      title: this._title,
      done: this._done,
      created_at: this._created_at,
    }
  }
}
