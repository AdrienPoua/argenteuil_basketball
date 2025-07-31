export interface User {
  id: string
  email: string
  role: string
}

export class UserEntity implements User {
  private readonly _id: string
  private readonly _email: string
  private readonly _role: string

  constructor(data: User) {
    this._id = data.id
    this._email = data.email
    this._role = data.role
  }

  get id(): string {
    return this._id
  }

  get email(): string {
    return this._email
  }

  get role(): string {
    return this._role
  }
}
