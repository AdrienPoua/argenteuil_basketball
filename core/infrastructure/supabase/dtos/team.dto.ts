import { MemberDTO } from './member.dto';
import { SessionDTO } from './session.dto';

export interface TeamDTO {
  id: string;
  name: string;
  category: string[];
  gender: string;
  level: string;
  created_at: string;
  image?: string;
  competitions: { id: number; label: string; poules: { id: number; nom: string }[] }[];
  coachs?: { member: MemberDTO }[];
  assistantsCoach?: { member: MemberDTO }[];
  sessions?: { sessions: SessionDTO }[];
}

export type CreateTeamWithRelationsDTO = {
  name: string;
  category: string[];
  gender: string;
  level: string;
  created_at: string;
  image?: string;
  competitions: { id: number; label: string; poules: { id: number; nom: string }[] }[];
  coachsIds: string[];
  assistantsCoachIds: string[];
  sessions: Omit<SessionDTO, 'id' | 'created_at'>[];
};
export type UpdateTeamWithRelationsDTO = Partial<CreateTeamWithRelationsDTO> & { id: string };
export type UpsertTeamWithRelationsDTO = Partial<CreateTeamWithRelationsDTO> & { id?: string };
