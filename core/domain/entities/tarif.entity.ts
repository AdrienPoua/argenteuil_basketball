export interface Tarif {
  id: string
  price: number
  category: TarifCategory
  min_age: number
  max_age: number
  mutation_price: number
  created_at: string
}

export enum TarifCategory {
  U07 = "U07",
  U09 = "U09",
  U11 = "U11",
  U13 = "U13",
  U15 = "U15",
  U18 = "U18",
  U21 = "U21",
  SENIORS = "Seniors",
  LOISIR = "Loisir",
  "Licence Pret (T)" = "Licence Pret (T)",
  "Licence non joueur" = "Licence non joueur",
}

export class TarifEntity implements Tarif {
  private readonly _id: string
  private readonly _price: number
  private readonly _category: TarifCategory
  private readonly _min_age: number
  private readonly _max_age: number
  private readonly _mutation_price: number
  private readonly _created_at: string

  constructor(data: Tarif) {
    this._id = data.id
    this._price = data.price
    this._category = data.category
    this._min_age = data.min_age
    this._max_age = data.max_age
    this._mutation_price = data.mutation_price
    this._created_at = data.created_at
  }

  get id(): string {
    return this._id
  }

  get price(): number {
    return this._price
  }

  get category(): TarifCategory {
    return this._category
  }

  get min_age(): number {
    return this._min_age
  }

  get max_age(): number {
    return this._max_age
  }

  get mutation_price(): number {
    return this._mutation_price
  }

  get created_at(): string {
    return this._created_at
  }

  toObject(): Tarif {
    return {
      id: this._id,
      price: this._price,
      category: this._category,
      min_age: this._min_age,
      max_age: this._max_age,
      mutation_price: this._mutation_price,
      created_at: this._created_at,
    }
  }
}
