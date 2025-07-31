export interface MemberDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string[]
  image?: string
  contact_privacy: {
    showEmail: boolean
    showPhone: boolean
  }
  created_at: string
} 