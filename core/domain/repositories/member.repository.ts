import { MemberEntity, MemberRole } from "@/core/domain/entities/member.entity"
import { BaseRepository } from "./base.repository.js"
import { MemberDTO } from "../dtos/member.dto.js"

export type MemberRepository = BaseRepository<MemberEntity, MemberDTO> & {
  findByRole: (role: MemberRole) => Promise<MemberEntity[]>
  findDirigeants: () => Promise<MemberEntity[]>
  findMembers: () => Promise<MemberEntity[]>
}
