import { teams } from "@/data/teams.json";
interface Competition {
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

interface TeamType {
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
  competitions: Competition[];
  clubId: string;
  sportId: string;
  logo: string;
  shareEventBackgroundUrl: string | null;
}

interface Location {
  loc: [number, number];
  regionSlug: string;
  departmentSlug: string;
  departmentName: string;
}

interface Club {
  teams: [];
  id: string;
  name: string;
  website: string;
  sportId: string;
  address: string;
  slug: string;
  alreadyManaged: boolean;
  rssFeeds: string[];
  code: string;
  facebookPage: string | null;
  facebookPageId: string | null;
  twitterAccount: string | null;
  ticketsUrl: string | null;
  seasons: string[];
  logo: string;
  banner: string | null;
  location: Location;
  urlV2: string;
  url: string;
  sponsoredContent: string | null;
}

interface UsableDataType {
  name: string;
  category: string;
  competitions: string[];
}

class Teams {
  private _data: TeamType[];
  constructor(data: Club) {
    this._data = data.teams;
  }
  get data(): TeamType[] {
    return this._data;
  }
}

type RankingType = {
  competitionId: string;
  date: string;
  official: boolean;
  sportId: string;
  teams: RankingTeam[];
};
type RankingStats = {
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
};
type RankingTeam = {
  clubId: string;
  teamId: string;
  name: string;
  shortName: string;
  teamSlug: string;
  clubSlug: string;
  rank: number;
  data: RankingStats[];
  logo: string | null;
  teamUrlV2: string;
};

class Ranking {
  private data: RankingType;
  constructor(data: RankingType) {
    this.data = data;
  }
  get rankingTeams(): RankingTeam[] {
    return this.data.teams;
  }
  static readonly getValue = (data: RankingTeam, key: keyof RankingStats) => {
    return data.data.find((item) => item.hasOwnProperty(key))?.[key];
  };
  static getPts(data: RankingTeam) {
    return this.getValue(data, "pts");
  }
  static getJo(data: RankingTeam) {
    return this.getValue(data, "jo");
  }
  static getG(data: RankingTeam) {
    return this.getValue(data, "g");
  }
  static getN(data: RankingTeam) {
    return this.getValue(data, "n");
  }
  static getP(data: RankingTeam) {
    return this.getValue(data, "p");
  }
  static getF(data: RankingTeam) {
    return this.getValue(data, "f");
  }
  static getBp(data: RankingTeam) {
    return this.getValue(data, "bp");
  }
  static getBc(data: RankingTeam) {
    return this.getValue(data, "bc");
  }
  static getCoeff(data: RankingTeam) {
    return this.getValue(data, "coeff");
  }
  static getFixPoints(data: RankingTeam) {
    return this.getValue(data, "fix_points");
  }
}

export { Teams, Ranking };
export type { TeamType, RankingTeam };
