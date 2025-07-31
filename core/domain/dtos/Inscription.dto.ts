import { Gender, StatutInscription, TypeInscription } from "../entities/inscription.entity"

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
  status: StatutInscription
  created_at: string
}