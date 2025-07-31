import { getCompetitions } from '@/core/presentation/actions/matchs/getCompetitions'
import ClientSidePage from './page.client'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const competitions = (await getCompetitions()) ?? []
  return <ClientSidePage competitions={competitions} />
}
