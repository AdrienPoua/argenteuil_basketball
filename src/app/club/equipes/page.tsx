import data from '@/data/players.json'
import { MemberFactory } from '@/factories'
import { CoachType, LeaderType, MemberType, PlayerType } from '@/types'

export default function Index() {

  const players = data.players.map((player) => MemberFactory.create(player)).filter((member) : member is PlayerType => member.player )
  console.log(players)
  return (
    <div>pages</div>
  )
}
