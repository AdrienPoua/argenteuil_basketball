export const dynamic = 'force-dynamic'

import { toPersistence } from '@/core/infrastructure/supabase/mappers/inscription.mapper'
import { getAllInscriptions } from '@/core/presentation/actions/inscriptions/getAllInscriptions'
import Page from './page.client'

export default async function PreInscriptionsPage() {
  const inscriptions = await getAllInscriptions()
  const inscriptionsDTO = inscriptions.map((inscription) => toPersistence(inscription))
  return <Page inscriptions={inscriptionsDTO} />
}
