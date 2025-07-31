import { BaseRepository } from './base.repository.js';
import { InscriptionDTO } from '../dtos/Inscription.dto.js';
import { InscriptionEntity } from '../entities/inscription.entity.js';

export type InscriptionRepository = BaseRepository<InscriptionEntity, InscriptionDTO>;
