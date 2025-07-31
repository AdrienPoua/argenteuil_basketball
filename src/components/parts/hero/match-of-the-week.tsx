import Card from '@/components/parts/hero/match.card'
import { NoMatch } from './NoMatch.card'
import { getWeeklyHomeMatchs } from '@/core/presentation/actions/matchs/getWeeklyHomeMatchs'
import { toPersistence } from '@/mappers/match.mapper'

export default async function WeeklyMatch() {
  const matchs = await getWeeklyHomeMatchs()
  const matchObject = matchs.map((match) => toPersistence(match))
  return (
    <div className="mb-20 flex min-h-96 flex-col items-center justify-center">
      <div className="container flex flex-col gap-10">
        {matchObject.length > 0 ? (
          matchObject.map((match) => <Card key={match.id} match={match} />)
        ) : (
          <NoMatch />
        )}
      </div>
    </div>
  )
}
