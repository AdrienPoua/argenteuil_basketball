"use client";
import { useQuery, useQueryClient } from "react-query";
import { getTeams } from "@/database/controllers/teams";
import { useState, useEffect } from "react";
import { Team } from "@/models";

export default function useFetchTeams() {
  const [teams, setTeams] = useState<Team[]>();
  const queryClient = useQueryClient();
  const { data, isLoading, error, isFetching } = useQuery(["teams"], () => getTeams());

  useEffect(() => {
    if (data) {
      setTeams(data
        .sort((a, b) => (a.image ? -1 : 1))
        .map((team) => new Team({ ...team, trainings: team.training }))
      );
    }
  }, [data]);

  const refreshData = () => {
    queryClient.invalidateQueries(["teams"]);
  };

  return { teams, data, isLoading, error, isFetching, refreshData };
}
