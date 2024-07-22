import { DBMatchType } from "@/utils/types";

export default function Adapter(match: DBMatchType) {
  return {
    Division: match.division,
    "N° de match ": match.matchNumber,
    "Equipe 1": match.teamA,
    "Equipe 2": match.teamB,
    "Date de rencontre": match.date,
    Heure: match.time,
    Salle: match.gym,
    update: match.update,
  };
}
