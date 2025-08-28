export const dynamic = 'force-dynamic'

import { toPersistence } from '@/core/infrastructure/supabase/mappers/inscription.mapper'
import { getAllInscriptions } from '@/core/presentation/actions/inscriptions/getAllInscriptions'
import Page from './page.client'
import { revalidatePath } from 'next/cache'

export default async function PreInscriptionsPage() {
  revalidatePath('/admin/inscriptions/pre-inscriptions')
  const inscriptions = await getAllInscriptions()
  const inscriptionsDTO = inscriptions.map((inscription) => toPersistence(inscription))
  return <Page inscriptions={inscriptionsDTO} />
}
