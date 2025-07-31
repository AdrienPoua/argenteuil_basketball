export interface Document {
  id: string
  title: string
  description: string
  url: string
  size: number
  created_at: string
}

export class DocumentEntity implements Document {
  private readonly _id: string
  private readonly _title: string
  private readonly _description: string
  private readonly _url: string
  private readonly _size: number
  private readonly _created_at: string

  constructor(data: Document) {
    this._id = data.id
    this._title = data.title
    this._description = data.description
    this._url = data.url
    this._size = data.size
    this._created_at = data.created_at
  }

  // Getters
  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get description(): string {
    return this._description
  }

  get url(): string {
    return this._url
  }

  get size(): number {
    return this._size
  }

  get created_at(): string {
    return this._created_at
  }
  // Méthodes utiles conservées
  getFormattedSize(): string {
    if (this._size < 1024) {
      return `${this._size} octets`
    } else if (this._size < 1024 * 1024) {
      return `${(this._size / 1024).toFixed(2)} Ko`
    } else {
      return `${(this._size / (1024 * 1024)).toFixed(2)} Mo`
    }
  }

  toObject(): Document {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      url: this._url,
      size: this._size,
      created_at: this._created_at,
    }
  }
}
