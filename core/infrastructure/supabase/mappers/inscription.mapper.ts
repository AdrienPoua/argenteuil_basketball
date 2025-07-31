import { InscriptionEntity } from '../../../domain/entities/inscription.entity'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { InscriptionDTO } from '../dtos/inscription.dto'

export function toDomain(data: InscriptionDTO): InscriptionEntity {
  const { created_at, ...rest } = data

  return new InscriptionEntity({
    id: rest.id,
    email: rest.email,
    gender: rest.gender,
    surclassement: rest.surclassement,
    created_at: safeParseDate(created_at),
    lastName: rest.last_name,
    firstName: rest.first_name,
    dateOfBirth: safeParseDate(rest.date_of_birth),
    phoneNumber: rest.phone_number,
    typeInscription: rest.type_inscription,
    status: rest.status,
    passSport: rest.passSport,
  })
}

export function toPersistence(entity: InscriptionEntity): InscriptionDTO {
  return {
    id: entity.id,
    last_name: entity.lastName,
    first_name: entity.firstName,
    email: entity.email,
    date_of_birth: entity.dateOfBirth.toISOString(),
    phone_number: entity.phoneNumber,
    gender: entity.gender,
    surclassement: entity.surclassement,
    type_inscription: entity.typeInscription,
    status: entity.status,
    created_at: entity.created_at.toISOString(),
    passSport: entity.passSport,
  }
}

function safeParseDate(dateValue: string): Date {
  try {
    if (!dateValue) return new Date()

    const date = new Date(dateValue)
    if (isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateValue}`)
      throw new Error(`Invalid date: ${dateValue}`)
    } else {
      return date
    }
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
