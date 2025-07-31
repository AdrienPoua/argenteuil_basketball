export interface Faq {
  id: string
  question: string
  answer: string
  order: number
  created_at: string
}

export class FaqEntity implements Faq {
  private readonly _id: string
  private readonly _question: string
  private readonly _answer: string
  private readonly _order: number
  private readonly _created_at: string

  constructor(data: Faq) {
    this._id = data.id
    this._question = data.question
    this._answer = data.answer
    this._order = data.order
    this._created_at = data.created_at
  }

  get id(): string {
    return this._id
  }

  get question(): string {
    return this._question
  }

  get answer(): string {
    return this._answer
  }

  get order(): number {
    return this._order
  }

  get created_at(): string {
    return this._created_at
  }

  toObject(): Faq {
    return {
      id: this._id,
      question: this._question,
      answer: this._answer,
      order: this._order,
      created_at: this._created_at,
    }
  }
}
