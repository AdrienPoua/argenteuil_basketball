"use client";
import teamsData from "@/data/teams.json";
import playersData from "@/data/players.json";
import { MemberFactory } from "@/factories";
import { AdherentType, PlayerType } from "@/types";
import { Team, Player } from "@/models";
import TeamCard from "@/components/Card";
import Layout from "@/components/layouts/main";
import { v4 as uuidv4 } from "uuid";
import { Box, Button } from "@mui/material";
import { TeamType } from "@/types";
import { useState, useEffect } from "react";

export default function Index() {
  const isPlayer = (member: AdherentType): member is PlayerType => {
    return member instanceof Player;
  };
  const players: PlayerType[] = playersData?.players.map((player) => MemberFactory.create(player, "player")).filter(isPlayer);

  const teams = teamsData
    .map((team) => MemberFactory.create(team, "team"))
    .filter((team): team is Team => team instanceof Team)
    .map((team) => {
      team.players = players;
      return team;
    });

  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [displayedTeams, setDisplayedTeams] = useState<TeamType[]>(teams);

  useEffect(() => {
    if (selectedTeam) {
      const filteredTeams = teams.filter(team => team.name === selectedTeam);
      setDisplayedTeams(filteredTeams);
      console.log(filteredTeams);
    } else {
      setDisplayedTeams(teams);
    }
  }, [selectedTeam]);

  return (
    <Layout pageTitle="Nos équipes">
      <Box className="p-4 bg-black">
        <Box className="flex flex-wrap">
          {teams.map((team: TeamType) => {
            const id = team.name;
            return (
              <Button
                size="large"
                className="m-2"
                variant="contained"
                key={uuidv4()}
                id={id}
                onClick={() => {
                  setSelectedTeam(id);
                }}
              >
                {team.name}
              </Button>
            );
          })}
        </Box>
      </Box>
      <Box className="flex flex-col grow gap-5 mx-20">
        {displayedTeams.map((team) => (
          <TeamCard key={uuidv4()} data={team} />
        ))}
      </Box>
    </Layout>
  );
}
