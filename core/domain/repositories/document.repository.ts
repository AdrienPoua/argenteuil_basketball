import { BaseRepository } from './base.repository'
import { DocumentDTO } from '../dtos/document.dto'
import { DocumentEntity } from '../entities/document.entity'

export type DocumentRepository = BaseRepository<DocumentEntity, DocumentDTO>
