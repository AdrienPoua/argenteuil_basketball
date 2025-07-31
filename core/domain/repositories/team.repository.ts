import { TeamEntity } from '@/core/domain/entities/team.entity';
import { BaseRepository } from './base.repository.js';
import {
  CreateTeamWithRelationsDTO,
  TeamDTO,
  UpdateTeamWithRelationsDTO,
  UpsertTeamWithRelationsDTO,
} from '../dtos/team.dto.js';

export type TeamRepository = BaseRepository<TeamEntity, TeamDTO> & {
  createWithRelations(input: CreateTeamWithRelationsDTO): Promise<TeamEntity>;
  updateWithRelations(id: string, input: UpdateTeamWithRelationsDTO): Promise<TeamEntity>;
  upsertWithRelations(input: UpsertTeamWithRelationsDTO): Promise<TeamEntity>;
  findByIdWithRelations(id: string): Promise<TeamEntity>;
  findAllWithRelations(): Promise<TeamEntity[]>;
};
