import { BaseRepository } from './base.repository'
import { InscriptionDTO } from '../dtos/inscription.dto'
import { InscriptionEntity } from '../entities/inscription.entity'

export type InscriptionRepository = BaseRepository<InscriptionEntity, InscriptionDTO>
