import { z } from 'zod';

export const ClubCompetitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().nullable(),
  sexe: z.string(),
  category: z.string(),
  family: z.string(),
  leagueSlug: z.string(),
  levelSlug: z.string(),
  poolSlug: z.string().nullable(),
  phaseSlug: z.string(),
  seasonSlug: z.string(),
});


export const ClubTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  sexe: z.string(),
  teamNumber: z.number().nullable(),
  squadPicture: z.string().nullable(),
  level: z.string(),
  shortName: z.string(),
  onlyOfficialScorer: z.boolean(),
  url: z.string(),
  isEntente: z.boolean(),
  urlV2: z.string(),
  fans: z.number(),
  competitions: z.array(ClubCompetitionSchema),
  clubId: z.string(),
  sportId: z.string(),
  logo: z.string(),
  shareEventBackgroundUrl: z.string().nullable(),
});


export const ClubLocationSchema = z.object({
  loc: z.tuple([z.number(), z.number()]),
  regionSlug: z.string(),
  departmentSlug: z.string(),
  departmentName: z.string(),
});


export const CompetitionDataSchema = z.object({
  pts: z.number().optional(),
  jo: z.number().optional(),
  g: z.number().optional(),
  n: z.number().optional(),
  p: z.number().optional(),
  f: z.number().optional(),
  bp: z.number().optional(),
  bc: z.number().optional(),
  coeff: z.string().optional(),
  fix_points: z.number().optional(),
});


export const CompetitionTeamsSchema = z.object({
  clubId: z.string(),
  teamId: z.string(),
  name: z.string(),
  shortName: z.string(),
  teamSlug: z.string(),
  clubSlug: z.string(),
  rank: z.number(),
  data: z.array(CompetitionDataSchema),
  logo: z.string().nullable(),
  teamUrlV2: z.string(),
});


export const CompetitionTypeSchema = z.object({
  competitionId: z.string(),
  date: z.string(),
  official: z.boolean(),
  sportId: z.string(),
  teams: z.array(CompetitionTeamsSchema),
  modifiers: z.array(z.any()),
});


export const ClubSchema = z.object({
  id: z.string(),
  name: z.string(),
  teams: z.array(ClubTeamSchema),
  website: z.string(),
  sportId: z.string(),
  address: z.string(),
  slug: z.string(),
  sponsors: z.string().nullable(),
  alreadyManaged: z.boolean(),
  rssFeeds: z.array(z.any()),
  code: z.string(),
  facebookPage: z.string().nullable(),
  facebookPageId: z.string().nullable(),
  twitterAccount: z.string().nullable(),
  ticketsUrl: z.string().nullable(),
  seasons: z.array(z.string()),
  logo: z.string(),
  banner: z.string().nullable(),
  location: ClubLocationSchema,
  urlV2: z.string(),
  url: z.string(),
  sponsoredContent: z.string().nullable(),
});

export type ClubType = z.infer<typeof ClubSchema>;
export type CompetitionType = z.infer<typeof CompetitionTypeSchema>;
export type CompetitionTeams = z.infer<typeof CompetitionTeamsSchema>;
export type CompetitionData = z.infer<typeof CompetitionDataSchema>;
export type CLubLocation = z.infer<typeof ClubLocationSchema>;
export type ClubTeam = z.infer<typeof ClubTeamSchema>;
export type ClubCompetition = z.infer<typeof ClubCompetitionSchema>;
