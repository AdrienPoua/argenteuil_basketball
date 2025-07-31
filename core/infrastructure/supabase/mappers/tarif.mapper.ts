import { TarifCategory, TarifEntity } from "../../../domain/entities/tarif.entity"
import { TarifDTO } from "../dtos/tarif.dto"

export function toDomain(data: TarifDTO): TarifEntity {
  return new TarifEntity({
    id: data.id,
    price: data.price,
    category: data.category as TarifCategory,
    min_age: data.min_age,
    max_age: data.max_age,
    mutation_price: data.mutation_price,
    created_at: data.created_at,
  })
}

export function toPersistence(entity: TarifEntity): TarifDTO {
  return {
    id: entity.id,
    price: entity.price,
    category: entity.category,
    min_age: entity.min_age,
    max_age: entity.max_age,
    mutation_price: entity.mutation_price,
    created_at: entity.created_at,
  }
}