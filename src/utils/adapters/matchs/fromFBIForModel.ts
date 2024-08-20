import { TFBI } from "@/utils/types";

// Transforme un match de la base de données FBI en un payload pour le model Match

export default function Adapter(matchFromFBI: TFBI.Match) {
  return {
    division: matchFromFBI.Division,
    matchNumber: matchFromFBI["N° de match "],
    teamA: matchFromFBI["Equipe 1"],
    teamB: matchFromFBI["Equipe 2"],
    date: matchFromFBI["Date de rencontre"],
    time: matchFromFBI["Heure"],
    gym: matchFromFBI["Salle"],
  };
}
