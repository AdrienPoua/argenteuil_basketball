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

interface Team {
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

interface TeamGroup {
  level: string;
  teams: Team[];
}

interface Location {
  loc: [number, number];
  regionSlug: string;
  departmentSlug: string;
  departmentName: string;
}

interface Club {
  teams: TeamGroup[];
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

class API {
  private _data: UsableDataType[];

  constructor(data: Club) {
    this._data = this.initializeData(data);
  }

  // Fonction pour extraire et transformer les données
  private initializeData(data: Club): UsableDataType[] {
    // Extraire toutes les équipes imbriquées dans les équipes des équipes
    const teams = data.teams.reduce<Team[]>((acc, val) => acc.concat(val.teams), []);
    
    // Transformer les données en un format utile
    return teams.map((team) => ({
      name : team.shortName,
      category: team.category,
      competitions: team.competitions.map((competition) => competition.name),
      level : team.level,
    }));
  }

  // Getter pour accéder aux données transformées
  get data(): UsableDataType[] {
    return this._data;
  }
}


export { API, Club, Location, Team, Competition, UsableDataType };
