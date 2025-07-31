import { FaqEntity } from "../../../domain/entities/faq.entity"
import { FaqDTO } from "../dtos/faq.dto"

export function toDomain(data: FaqDTO): FaqEntity {
  return new FaqEntity(data)
}

export function toPersistence(entity: FaqEntity): FaqDTO {
  return {
    id: entity.id,
    question: entity.question,
    answer: entity.answer,
    order: entity.order,
    created_at: entity.created_at,
  }
}
