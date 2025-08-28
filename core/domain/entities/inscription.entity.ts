export type StatutInscription = 'EN_ATTENTE' | 'TRAITEE' | 'REJETEE'
export type TypeInscription =
  | 'RENOUVELLEMENT'
  | 'MUTATION'
  | 'NOUVELLE_LICENCE'
  | 'RENOUVELLEMENT_SANS_MUTATION'
export type Gender = 'Masculin' | 'Féminin'

interface Inscription {
  id: string
  lastName: string
  firstName: string
  email: string
  dateOfBirth: Date
  phoneNumber: string
  gender: Gender
  surclassement: boolean
  typeInscription: TypeInscription
  passSport: string
  status: StatutInscription
  created_at: Date
}

export class InscriptionEntity implements Inscription {
  private readonly _id: string
  private readonly _lastName: string
  private readonly _firstName: string
  private readonly _email: string
  private readonly _dateOfBirth: Date
  private readonly _phoneNumber: string
  private readonly _gender: Gender
  private readonly _surclassement: boolean
  private readonly _typeInscription: TypeInscription
  private readonly _passSport: string
  private readonly _status: StatutInscription
  private readonly _created_at: Date

  constructor(data: Inscription) {
    this._id = data.id
    this._lastName = data.lastName
    this._firstName = data.firstName
    this._email = data.email
    this._dateOfBirth = data.dateOfBirth
    this._phoneNumber = data.phoneNumber
    this._gender = data.gender
    this._surclassement = data.surclassement
    this._typeInscription = data.typeInscription
    this._passSport = data.passSport
    this._status = data.status
    this._created_at = data.created_at
  }

  get id(): string {
    return this._id
  }

  get lastName(): string {
    return this._lastName
  }

  get firstName(): string {
    return this._firstName
  }

  get email(): string {
    return this._email
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth
  }

  get phoneNumber(): string {
    return this._phoneNumber
  }

  get gender(): Gender {
    return this._gender
  }

  get surclassement(): boolean {
    return this._surclassement
  }

  get typeInscription(): TypeInscription {
    return this._typeInscription
  }

  get passSport(): string {
    return this._passSport
  }

  get status(): StatutInscription {
    return this._status
  }

  get created_at(): Date {
    return this._created_at
  }

  public toObject(): Inscription {
    return {
      id: this._id,
      lastName: this._lastName,
      firstName: this._firstName,
      email: this._email,
      dateOfBirth: this._dateOfBirth,
      phoneNumber: this._phoneNumber,
      gender: this._gender,
      surclassement: this._surclassement,
      typeInscription: this._typeInscription,
      passSport: this._passSport,
      status: this._status,
      created_at: this._created_at,
    }
  }
}
