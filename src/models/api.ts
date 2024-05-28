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

interface Level {
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
  teams: Level[];
  id: string;
  name: string;
  website: string;
  sportId: string;
  address: string;
  slug: string;
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
  location: Location;
  urlV2: string;
  url: string;
  sponsoredContent: any | null;
}

class API {
    private _data: Club;
  
    constructor(data: Club) {
      this._data = data;
    }
  
    getAllTeams() {
      const teams: { name: string; category: string; competitions: string[] }[] = [];
  
      this._data.teams.forEach((level: Level) => {
        level.teams.forEach((team: Team) => {
          const teamInfo = {
            name: team.name,
            category: team.category,
            competitions: team.competitions.map((competition) => competition.name),
          };
          teams.push(teamInfo);
        });
      });
  
      return teams;
    }
  }

  export type { API, Club, Level, Location, Team, Competition };

  
