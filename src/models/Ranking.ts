interface TeamData {
  pts?: number;
  jo?: number;
  g?: number;
  n?: number;
  p?: number;
  f?: number;
  bp?: number;
  bc?: number;
  coeff?: number | string;
  fix_points?: number;
}

interface Team {
  clubId: string;
  teamId: string;
  name: string;
  shortName: string;
  teamSlug: string;
  clubSlug: string;
  rank: number;
  data: TeamData[];
  logo: string | null;
  teamUrlV2: string;
}

interface Constructor {
  competitionId: string;
  date: string;
  official: boolean;
  sportId: string;
  teams: Team[];
  modifiers: any[]; // Typage spécifique si connu
}

export default class Ranking {
  private readonly _data: Constructor;
  private readonly _teams: Team[];

  constructor(data: Constructor) {
    this._data = data;
    this._teams = data.teams;
  }

  get teams(): Team[] {
    return this._teams;
  }

  static readonly getValue = (team: Team, key: keyof TeamData) => {
    return team.data.find((item) => item.hasOwnProperty(key))?.[key];
  };

  static getPts(data: Team) {
    return this.getValue(data, 'pts');
  }
  static getJo(data: Team) {
    return this.getValue(data, 'jo');
  }
  static getG(data: Team) {
    return this.getValue(data, 'g');
  }
  static getN(data: Team) {
    return this.getValue(data, 'n');
  }
  static getP(data: Team) {
    return this.getValue(data, 'p');
  }
  static getF(data: Team) {
    return this.getValue(data, 'f');
  }
  static getBp(data: Team) {
    return this.getValue(data, 'bp');
  }
  static getBc(data: Team) {
    return this.getValue(data, 'bc');
  }
  static getCoeff(data: Team) {
    return this.getValue(data, 'coeff');
  }
  static getFixPoints(data: Team) {
    return this.getValue(data, 'fix_points');
  }
}
