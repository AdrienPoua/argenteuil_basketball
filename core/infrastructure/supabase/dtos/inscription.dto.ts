import {
  Gender,
  StatutInscription,
  TypeInscription,
} from '@/core/domain/entities/inscription.entity'

export interface InscriptionDTO {
  id: string
  last_name: string
  first_name: string
  email: string
  date_of_birth: string
  phone_number: string
  gender: Gender
  surclassement: boolean
  type_inscription: TypeInscription
  passSport: string
  status: StatutInscription
  created_at: string
}

export interface CreateInscriptionDTO extends Omit<InscriptionDTO, 'id' | 'created_at'> {
  status: 'EN_ATTENTE'
}

export interface UpdateInscriptionDTO extends Partial<InscriptionDTO> {
  id: string
}
