import { MemberEntity, MemberRole } from '../../../domain/entities/member.entity';
import { MemberDTO } from '../dtos/member.dto';

export const isMemberRole = (role: string): role is MemberRole => {
  return Object.values(MemberRole).includes(role as MemberRole);
};

export function toDomain(data: MemberDTO): MemberEntity {
  return new MemberEntity({
    ...data,
    role: data.role.map((role) => (isMemberRole(role) ? role : MemberRole.Other)),
  });
}
export function toPersistence(entity: MemberEntity): MemberDTO {
  return {
    id: entity.id,
    first_name: entity.first_name,
    last_name: entity.last_name,
    email: entity.email,
    phone: entity.phone,
    role: entity.role,
    image: entity.image,
    contact_privacy: entity.contact_privacy,
    created_at: entity.created_at,
  };
}
