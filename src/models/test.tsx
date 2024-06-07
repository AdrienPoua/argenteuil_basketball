import { Gym, Team, Player } from './models';
import gymData from './data/gymnases.json';
import teamData from './data/teams.json';
import playerData from './data/players.json';

export const gyms: Gym[] = gymData.map((gym: any) => new Gym(gym));
export const teams: Team[] = teamData.map((team: any) => new Team(team));
export const players: Player[] = playerData.map((player: any) => new Player(player));

