import { GymnaseEntity } from '../../../domain/entities/gymnase.entity';
import { GymnaseDTO } from '../dtos/gymnase.dto';

export function toDomain(data: GymnaseDTO): GymnaseEntity {
  return new GymnaseEntity(data);
}

export function toPersistence(entity: GymnaseEntity): GymnaseDTO {
  return {
    id: entity.id,
    name: entity.name,
    address: entity.address,
    city: entity.city,
    zipCode: entity.zipCode,
    created_at: entity.created_at,
  };
}
