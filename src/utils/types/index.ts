import { z } from "zod";
import {
  GymSchema,
  MemberSchema,
  NavItemSchema,
  SubItemSchema,
  TeamSchema,
  TrainingSchema,
  ClubCompetitionSchema,
  ClubSchema,
  CompetitionTeamsSchema,
  CompetitionTypeSchema,
  CompetitionDataSchema,
  ClubLocationSchema,
  ClubTeamSchema,
  APIClubSchema,
  DBMemberSchema,
  CoachSchema,
  MatchSchema,
  DBMatchSchema,
  StaffSchema,
  LeaderSchema,
} from "@/lib/zod/schemas";

import { StaffPropsType } from "@/utils/models/Staff";
import { LeaderPropsType } from "@/utils/models/Leader";
import { CoachPropsType } from "@/utils/models/Coach";

type GymType = z.infer<typeof GymSchema>;
type MemberType = z.infer<typeof MemberSchema>;
type NavItemType = z.infer<typeof NavItemSchema>;
type SubItemType = z.infer<typeof SubItemSchema>;
type TrainingType = z.infer<typeof TrainingSchema>;
type TeamType = z.infer<typeof TeamSchema>;
type ClubType = z.infer<typeof ClubSchema>;
type CompetitionType = z.infer<typeof CompetitionTypeSchema>;
type CompetitionTeams = z.infer<typeof CompetitionTeamsSchema>;
type CompetitionData = z.infer<typeof CompetitionDataSchema>;
type CLubLocation = z.infer<typeof ClubLocationSchema>;
type ClubTeam = z.infer<typeof ClubTeamSchema>;
type ClubCompetition = z.infer<typeof ClubCompetitionSchema>;
type APIClubType = z.infer<typeof APIClubSchema>;
type LeaderType = z.infer<typeof LeaderSchema>;
type DBMemberType = z.infer<typeof DBMemberSchema>;
type MatchType = z.infer<typeof MatchSchema>;
type DBMatchType = z.infer<typeof DBMatchSchema>;
type StaffType = z.infer<typeof StaffSchema>;
type CoachType = z.infer<typeof CoachSchema>;

export type {
  GymType,
  DBMemberType,
  DBMatchType,
  APIClubType,
  MemberType,
  NavItemType,
  SubItemType,
  TrainingType,
  LeaderType,
  CoachType,
  StaffPropsType,
  TeamType,
  ClubType,
  CompetitionType,
  CompetitionTeams,
  CompetitionData,
  CLubLocation,
  ClubTeam,
  ClubCompetition,
  MatchType,
  StaffType,
  LeaderPropsType,
  CoachPropsType,
};
