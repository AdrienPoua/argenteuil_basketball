import { MemberEntity } from './member.entity'
import { SessionEntity } from './session.entity'

export class TeamEntity implements Team {
  private readonly _id: string
  private readonly _name: string
  private readonly _category: Category[]
  private readonly _gender: Gender
  private readonly _level: Level
  private readonly _image?: string
  private readonly _created_at: string
  private readonly _competitions: {
    id: number
    label: string
    poules: { id: number; nom: string }[]
  }[]
  private readonly _coachs: MemberEntity[] = []
  private readonly _assistantsCoachs: MemberEntity[] = []
  private readonly _sessions: SessionEntity[] = []

  constructor(data: Team) {
    this._id = data.id
    this._name = data.name
    this._category = data.category
    this._gender = data.gender
    this._level = data.level
    this._image = data.image
    this._created_at = data.created_at
    this._competitions = data.competitions ?? []
    // Initialiser les collections si elles sont fournies
    this._coachs = data.coachs ?? []
    this._assistantsCoachs = data.assistantsCoach ?? []
    this._sessions = data.sessions ?? []
  }

  // Getters pour l'interface Team
  get id(): string {
    return this._id
  }
  get name(): string {
    return this._name
  }
  get category(): Category[] {
    return this._category
  }
  get gender(): Gender {
    return this._gender
  }
  get level(): Level {
    return this._level
  }
  get image(): string | undefined {
    return this._image
  }
  get coachs(): MemberEntity[] {
    return [...this._coachs]
  }
  get assistantsCoach(): MemberEntity[] {
    return [...this._assistantsCoachs]
  }
  get sessions(): SessionEntity[] {
    return [...this._sessions]
  }
  // Getters additionnels
  get created_at(): string {
    return this._created_at
  }
  get competitions(): { id: number; label: string; poules: { id: number; nom: string }[] }[] {
    return [...this._competitions]
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      gender: this.gender,
      level: this.level,
      created_at: this.created_at,
      image: this.image,
      coachs: this.coachs.map((coach) => coach.toObject()),
      assistantsCoach: this.assistantsCoach.map((assistant) => assistant.toObject()),
      sessions: this.sessions.map((session) => session.toObject()),
      competitions: this.competitions,
    }
  }
}

export enum Category {
  U07 = 'U07',
  U09 = 'U09',
  U11 = 'U11',
  U13 = 'U13',
  U15 = 'U15',
  U18 = 'U18',
  U21 = 'U21',
  Seniors = 'Seniors',
  Veterans = 'Vétérans',
  Loisir = 'Loisir',
}

export enum Gender {
  Masculin = 'Masculin',
  Feminin = 'Féminin',
  Mixte = 'Mixte',
}

export enum Level {
  Loisir = 'Loisir',
  Ecole = 'Ecole de basket',
  Départemental = 'Départemental',
  Départemental1 = 'Pré-régional',
  Départemental3 = 'Départemental 3',
}

export interface Team {
  id: string
  name: string
  category: Category[]
  gender: Gender
  level: Level
  image?: string
  created_at: string
  coachs: MemberEntity[]
  assistantsCoach: MemberEntity[]
  sessions: SessionEntity[]
  competitions: { id: number; label: string; poules: { id: number; nom: string }[] }[]
}
