import { BaseRepository } from "./base.repository.js"
import { SessionDTO } from "../dtos/session.dto.js"
import { SessionEntity } from "../entities/session.entity.js"

export type SessionRepository = BaseRepository<SessionEntity, SessionDTO>
