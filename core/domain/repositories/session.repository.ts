import { BaseRepository } from './base.repository'
import { SessionDTO } from '../dtos/session.dto'
import { SessionEntity } from '../entities/session.entity'

export type SessionRepository = BaseRepository<SessionEntity, SessionDTO>
