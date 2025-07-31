import { ReactNode } from "react"

export interface Email {
  to: string[] | string
  subject: string
  from: string
  cc?: string | string[]
  bcc?: string | string[]
  template: ReactNode
}

export class EmailEntity implements Email {
  private readonly _to: string[] | string
  private readonly _subject: string
  private readonly _from: string
  private readonly _cc?: string | string[]
  private readonly _bcc?: string | string[]
  private readonly _template: ReactNode
  constructor(data: Email) {
    this._to = data.to
    this._subject = data.subject
    this._template = data.template
    this._from = data.from
    this._cc = data.cc
    this._bcc = data.bcc
  }

  get to(): string[] | string {
    return this._to
  }

  get subject(): string {
    return this._subject
  }

  get template(): ReactNode {
    return this._template
  }

  get from(): string {
    return this._from
  }

  get cc(): string | string[] | undefined {
    return this._cc
  }

  get bcc(): string | string[] | undefined {
    return this._bcc
  }
}
