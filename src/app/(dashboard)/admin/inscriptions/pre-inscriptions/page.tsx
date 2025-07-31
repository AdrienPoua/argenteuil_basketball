import { toPersistence } from '@/core/infrastructure/supabase/mappers/inscription.mapper'
import { getAllInscriptions } from '@/core/presentation/actions/inscriptions/getAllInscriptions'
import PreInscriptionsPageClient from './page.client'

export default async function PreInscriptionsPage() {
  const inscriptions = await getAllInscriptions()
  const inscriptionsDTO = inscriptions.map((inscription) => toPersistence(inscription))
  return <PreInscriptionsPageClient inscriptions={inscriptionsDTO} />
}
