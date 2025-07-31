import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseBaseRepository } from './base.repository'
import { DocumentEntity } from '../../../domain/entities/document.entity'
import { DocumentRepository } from '../../../domain/repositories/document.repository'
import { DocumentDTO } from '../dtos/document.dto'
import { toDomain } from '../mappers/document.mapper'

export class SupabaseDocumentRepository
  extends SupabaseBaseRepository<DocumentEntity, DocumentDTO>
  implements DocumentRepository
{
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super('documents', client, toDomain)
  }

  async delete(id: string): Promise<void> {
    const client = await this.getClient()
    const document = await this.findById(id)
    if (!document) {
      throw new Error('Document non trouvé')
    }
    await client.from('documents').delete().eq('id', id)
    const fileName = document.url.split('/documents/')[1]
    if (!fileName) throw new Error('Nom de fichier non trouvé')

    const { error: storageError } = await client.storage.from('documents').remove([fileName])

    if (storageError) {
      throw storageError
    }
  }
}
