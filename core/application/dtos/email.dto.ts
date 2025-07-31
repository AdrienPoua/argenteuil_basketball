export interface EmailDTO {
  to: string[] | string
  subject: string
  from: string
  cc?: string | string[]
  bcc?: string | string[]
} 