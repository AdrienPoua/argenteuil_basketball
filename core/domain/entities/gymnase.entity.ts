export interface Gymnase {
  id: string
  name: string
  address: string
  city: string
  zipCode: number
  created_at: string
}

export class GymnaseEntity implements Gymnase {
  private readonly _id: string
  private readonly _name: string
  private readonly _address: string
  private readonly _city: string
  private readonly _zipCode: number
  private readonly _created_at: string

  constructor(data: Gymnase) {
    this._id = data.id
    this._name = data.name
    this._address = data.address
    this._city = data.city
    this._zipCode = data.zipCode
    this._created_at = data.created_at
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get address(): string {
    return this._address
  }

  get city(): string {
    return this._city
  }

  get created_at(): string {
    return this._created_at
  }

  get zipCode(): number {
    return this._zipCode
  }

  toObject(): Gymnase {
    return {
      id: this._id,
      name: this._name,
      address: this._address,
      city: this._city,
      zipCode: this._zipCode,
      created_at: this._created_at,
    }
  }
}
