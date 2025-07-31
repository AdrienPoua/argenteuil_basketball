import { toPersistence as toMemberPersistence } from './member.mapper'
import { toPersistence as toSessionPersistence } from './session.mapper'
import { MemberEntity, MemberRole } from '../../../domain/entities/member.entity'
import { SessionEntity } from '../../../domain/entities/session.entity'
import { Team, TeamEntity } from '../../../domain/entities/team.entity'
import { TeamDTO } from '../dtos/team.dto'

const isMemberRole = (role: string[]): role is MemberRole[] => {
  return role.every((r) => Object.values(MemberRole).includes(r as MemberRole))
}

export function toDomain(data: TeamDTO): TeamEntity {
  const coachEntities = data.coachs?.map(({ member }) => {
    const role = isMemberRole(member.role) ? member.role : [MemberRole.Other]
    return new MemberEntity({
      ...member,
      role,
    })
  })
  const assistantCoachEntities = data.assistantsCoach?.map(({ member }) => {
    const role = isMemberRole(member.role) ? member.role : [MemberRole.Other]
    return new MemberEntity({
      ...member,
      role,
    })
  })
  const sessionEntities = data.sessions?.map(({ sessions }) => new SessionEntity(sessions))
  const payload = {
    ...data,
    coachs: coachEntities,
    assistantsCoach: assistantCoachEntities,
    sessions: sessionEntities,
  } as Team
  return new TeamEntity(payload)
}

export function toPersistence(data: TeamEntity): TeamDTO {
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    gender: data.gender,
    level: data.level,
    image: data.image,
    created_at: data.created_at,
    competitions: data.competitions,
    coachs: data.coachs.map((coach) => ({ member: toMemberPersistence(coach) })),
    assistantsCoach: data.assistantsCoach.map((assistant) => ({
      member: toMemberPersistence(assistant),
    })),
    sessions: data.sessions.map((session) => ({ sessions: toSessionPersistence(session) })),
  }
}
