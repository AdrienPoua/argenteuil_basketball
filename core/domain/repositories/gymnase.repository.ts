import { BaseRepository } from "./base.repository.js"
import { GymnaseDTO } from "../dtos/gymnase.dto.js"
import { GymnaseEntity } from "../entities/gymnase.entity.js"

export type GymnaseRepository = BaseRepository<GymnaseEntity, GymnaseDTO>
