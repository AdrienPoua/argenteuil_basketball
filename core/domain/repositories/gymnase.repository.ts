import { BaseRepository } from './base.repository'
import { GymnaseDTO } from '../dtos/gymnase.dto'
import { GymnaseEntity } from '../entities/gymnase.entity'

export type GymnaseRepository = BaseRepository<GymnaseEntity, GymnaseDTO>
