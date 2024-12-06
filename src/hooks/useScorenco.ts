import { useQuery } from "react-query";
import { getClubData, getRankingData } from "@/utils/serverActions";
import { useState, useEffect } from "react";
import { Ranking } from "@/models";

export default function useScorenco() {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [ranking, setRanking] = useState<Ranking | undefined>(undefined);

  const { data: clubs, error: errorClubs, isLoading: loadingClubs } = useQuery(["clubData"], () => getClubData());

  const { data: rankingData, error: errorRanking } = useQuery(["rankingData", selectedTeam], () => getRankingData(selectedTeam), {
    enabled: !!selectedTeam,
  });

  useEffect(() => {
    if (clubs && clubs.teams.length > 0 && clubs.teams[0].competitions.length > 0) {
      const seniorTeam = clubs.teams[0].competitions[0].id.toString();
      setSelectedTeam(seniorTeam);
    }
  }, [clubs]);

  useEffect(() => {
    if (rankingData) {
      setRanking(new Ranking(rankingData));
    }
  }, [rankingData]);


  return {
    clubs,
    loadingClubs,
    errorClubs,
    ranking,
    errorRanking,
    selectedTeam,
    setSelectedTeam,
  };
}
