import GymSchema from "@/lib/zod/schemas/models/GymSchema";
import SubItemSchema from "@/lib/zod/schemas/json/SubItemSchema";
import NavItemSchema from "@/lib/zod/schemas/json/NavItemSchema";
import MemberSchema from "@/lib/zod/schemas/models/MemberSchema";
import TeamSchema from "@/lib/zod/schemas/models/TeamSchema";
import TrainingSchema from "@/lib/zod/schemas/models/TrainingSchema";
import DocumentSchema from "@/lib/zod/schemas/models/DocumentSchema";
import FAQSchema from "@/lib/zod/schemas/models/FAQSchema";
import ClubSchema from "@/lib/zod/schemas/models/ClubSchema";
import PermanencesSchema from "@/lib/zod/schemas/models/PermanencesSchema";
import DBMemberSchema from "@/lib/zod/schemas/database/MemberSchema";
import DBMatchSchema from "@/lib/zod/schemas/database/MatchSchema";
import MatchSchema from "@/lib/zod/schemas/models/MatchSchema";
import StaffSchema from "@/lib/zod/schemas/models/StaffSchema";
import LeaderSchema from "@/lib/zod/schemas/models/LeaderSchema";
import CoachSchema from "@/lib/zod/schemas/models/CoachSchema";
import {
  ClubCompetitionSchema,
  ClubTeamSchema,
  ClubLocationSchema,
  CompetitionDataSchema,
  CompetitionTeamsSchema,
  CompetitionTypeSchema,
  ClubSchema as APIClubSchema,
} from "@/lib/zod/schemas/API/scorenco";

import { ValidateWithZod } from "@/lib/zod/utils";

export {
  GymSchema,
  DBMatchSchema,
  PermanencesSchema,
  DBMemberSchema,
  ClubSchema,
  FAQSchema,
  DocumentSchema,
  LeaderSchema,
  CoachSchema,
  SubItemSchema,
  NavItemSchema,
  MemberSchema,
  TeamSchema,
  TrainingSchema,
  StaffSchema,
  ClubCompetitionSchema,
  ClubTeamSchema,
  ClubLocationSchema,
  CompetitionDataSchema,
  CompetitionTeamsSchema,
  CompetitionTypeSchema,
  APIClubSchema,
  MatchSchema,
  ValidateWithZod
};
