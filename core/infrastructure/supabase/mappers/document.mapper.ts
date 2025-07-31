import { DocumentEntity } from "../../../domain/entities/document.entity"
import { DocumentDTO } from "../dtos/document.dto"

export function toDomain(data: DocumentDTO): DocumentEntity {
  return new DocumentEntity(data)
}

export function toPersistence(entity: DocumentEntity): DocumentDTO {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    url: entity.url,
    size: entity.size,
    created_at: entity.created_at,
  }
}
