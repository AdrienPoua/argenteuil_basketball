import { SessionEntity } from "../../../domain/entities/session.entity"
import { SessionDTO } from "../dtos/session.dto"

export function toDomain(data: SessionDTO): SessionEntity {
  return new SessionEntity(data)
}

export function toPersistence(entity: SessionEntity): SessionDTO {
  return {
    id: entity.id,
    day: entity.day,
    start: entity.start,
    end: entity.end,
    gymnase_id: entity.gymnase_id,
    created_at: entity.created_at,
  }
}
