import {
  Gender,
  StatutInscription,
  TypeInscription,
} from '../../domain/entities/inscription.entity'

export interface InscriptionDTO {
  id: string
  lastName: string
  firstName: string
  email: string
  dateOfBirth: string
  phoneNumber: string
  gender: Gender
  surclassement: boolean
  typeInscription: TypeInscription
  status: StatutInscription
  createdAt: string
}
