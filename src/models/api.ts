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

class TEAMS {
  private _data: TeamType[];
  constructor(data: Club) {
    this._data = data.teams
  }
  get data() : TeamType[] {
    return this._data;
  }
}

export { TEAMS , Club, Location, TeamType, Competition, UsableDataType };
