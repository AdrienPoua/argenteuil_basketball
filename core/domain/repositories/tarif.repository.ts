import { TarifEntity } from '@/core/domain/entities/tarif.entity'
import { BaseRepository } from './base.repository'
import { TarifDTO } from '../dtos/tarif.dto'

export type TarifRepository = BaseRepository<TarifEntity, TarifDTO>
