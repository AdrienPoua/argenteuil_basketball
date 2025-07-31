import { FaqEntity } from '@/core/domain/entities/faq.entity'
import { BaseRepository } from './base.repository'
import { FaqDTO } from '../dtos/faq.dto'

export type FaqRepository = BaseRepository<FaqEntity, FaqDTO>
