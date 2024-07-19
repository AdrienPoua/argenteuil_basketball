import { z } from "zod";
import {
  GymSchema,
  LeadershipSchema,
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
  MatchSchema,
} from "@/lib/zod";

type GymType = z.infer<typeof GymSchema>;
type LeadershipType = z.infer<typeof LeadershipSchema>;
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
type DBMemberType = z.infer<typeof DBMemberSchema>;
type MatchType = z.infer<typeof MatchSchema>;

export type {
  GymType,
  DBMemberType,
  APIClubType,
  LeadershipType,
  MemberType,
  NavItemType,
  SubItemType,
  TrainingType,
  TeamType,
  ClubType,
  CompetitionType,
  CompetitionTeams,
  CompetitionData,
  CLubLocation,
  ClubTeam,
  ClubCompetition,
  MatchType,
};
