import GymSchema from "@/lib/zod/GymSchema";
import LeadershipSchema from "@/lib/zod/LeadershipSchema";
import SubItemSchema from "@/lib/zod/SubItemSchema";
import NavItemSchema from "@/lib/zod/NavItemSchema";
import MemberSchema from "@/lib/zod/MemberSchema";
import TeamSchema from "@/lib/zod/TeamSchema";
import TrainingSchema from "@/lib/zod/TrainingSchema";
import DocumentSchema from "@/lib/zod/DocumentSchema";
import FAQSchema from "@/lib/zod/FAQSchema";
import ClubSchema from "@/lib/zod/ClubSchema";
import PermanencesSchema from "@/lib/zod/PermanencesSchema";
import DBMemberSchema from "@/lib/zod/database/MemberSchema";
import MatchSchema from "@/lib/zod/MatchSchema";
import {
  ClubCompetitionSchema,
  ClubTeamSchema,
  ClubLocationSchema,
  CompetitionDataSchema,
  CompetitionTeamsSchema,
  CompetitionTypeSchema,
  ClubSchema as APIClubSchema,
} from "@/lib/zod/APISchema";

export {
  GymSchema,
  PermanencesSchema,
  DBMemberSchema,
  ClubSchema,
  FAQSchema,
  DocumentSchema,
  LeadershipSchema,
  SubItemSchema,
  NavItemSchema,
  MemberSchema,
  TeamSchema,
  TrainingSchema,
  ClubCompetitionSchema,
  ClubTeamSchema,
  ClubLocationSchema,
  CompetitionDataSchema,
  CompetitionTeamsSchema,
  CompetitionTypeSchema,
  APIClubSchema,
  MatchSchema,
};
