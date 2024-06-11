interface ClubCompetition {
  id: string;
  name: string;
  shortName: string | null;
  sexe: string;
  category: string;
  family: string;
  leagueSlug: string;
  levelSlug: string;
  poolSlug: string | null;
  phaseSlug: string;
  seasonSlug: string;
}
export interface ClubTeam {
  id: string;
  name: string;
  slug: string;
  category: string;
  sexe: string;
  teamNumber: number | null;
  squadPicture: string | null;
  level: string;
  shortName: string;
  onlyOfficialScorer: boolean;
  url: string;
  isEntente: boolean;
  urlV2: string;
  fans: number;
  competitions: ClubCompetition[];
  clubId: string;
  sportId: string;
  logo: string;
  shareEventBackgroundUrl: string | null;
}

interface CLubLocation {
  loc: [number, number];
  regionSlug: string;
  departmentSlug: string;
  departmentName: string;
}

export interface CompetitionData {
  pts?: number;
  jo?: number;
  g?: number;
  n?: number;
  p?: number;
  f?: number;
  bp?: number;
  bc?: number;
  coeff?: string;
  fix_points?: number;
}

export interface CompetitionTeams {
  clubId: string;
  teamId: string;
  name: string;
  shortName: string;
  teamSlug: string;
  clubSlug: string;
  rank: number;
  data: CompetitionData[];
  logo: string | null;
  teamUrlV2: string;
}

export interface CompetitionType {
  competitionId: string;
  date: string;
  official: boolean;
  sportId: string;
  teams: CompetitionTeams[];
  modifiers: any[];
}


export interface ClubType {
  id: string;
  name: string;
  teams: ClubTeam[];
  website: string;
  sportId: string;
  address: string;
  slug: string;
  sponsors: string | null;
  alreadyManaged: boolean;
  rssFeeds: any[];
  code: string;
  facebookPage: string | null;
  facebookPageId: string | null;
  twitterAccount: string | null;
  ticketsUrl: string | null;
  seasons: string[];
  logo: string;
  banner: string | null;
  location: CLubLocation;
  urlV2: string;
  url: string;
  sponsoredContent: string | null;
}
