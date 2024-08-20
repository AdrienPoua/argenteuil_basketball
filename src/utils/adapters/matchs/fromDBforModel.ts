import { TDatabase } from "@/utils/types";

export default function Adapter(match: TDatabase.Match) {
  return {
    division: match.division,
    matchNumber: match.matchNumber,
    teamA: match.teamA,
    teamB: match.teamB,
    date: match.date,
    time: match.time,
    gym: match.gym,
  };
}
