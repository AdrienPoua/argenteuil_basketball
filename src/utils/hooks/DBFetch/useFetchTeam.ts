"use client";
import { useQuery, useQueryClient } from "react-query";
import { getTeams } from "@/lib/mongo/controllers/teams";
import { useState, useEffect } from "react";
import { Team } from "@/utils/models";

export default function useFetchTeams() {
  const [teams, setTeams] = useState<Team[]>();
  const queryClient = useQueryClient();
  const { data, isLoading, error, isFetching } = useQuery(["teams"], () => getTeams());

  useEffect(() => {
    if (data) {
      setTeams(data.map((team) => new Team({ ...team, trainings: team.training })));
    }
  }, [data]);

  const refreshTeams = () => {
    queryClient.invalidateQueries(["teams"]);
  };

  return { teams, data, isLoading, error, isFetching, refreshTeams };
}
