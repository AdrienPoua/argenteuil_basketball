import { FaqEntity } from '@/core/domain/entities/faq.entity';
import { BaseRepository } from './base.repository.js';
import { FaqDTO } from '../dtos/faq.dto.js';

export type FaqRepository = BaseRepository<FaqEntity, FaqDTO>;
