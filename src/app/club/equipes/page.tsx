"use client";
import teamsData from "@/data/teams.json";
import playersData from "@/data/players.json";
import { MemberFactory } from "@/factories";
import { TeamType, AdherentType, PlayerType } from "@/types";
import { Team, Player } from "@/models";
import TeamCard from "@/components/Card";
import CardLayout from "@/components/layouts/CardLayout";

export default function Index() {
  const isPlayer = (member: AdherentType): member is PlayerType => {
    return member instanceof Player;
  };
  const players: PlayerType[] = playersData?.players
    .map((player) => MemberFactory.create(player, "player"))
    .filter(isPlayer);

    const teams = teamsData.teams
        .map((team) => MemberFactory.create(team, "team"))
        .filter((team): team is Team => team instanceof Team)
        .map((team) => { team.players = players; return team; })

  return (
    <CardLayout pageTitle='Nos équipes '>
      <div className="flex flex-col gap-5">
      {teams.map((team) => (
        <TeamCard key={team.name} data={team} />
      ))}
      </div>
    </CardLayout>
  );
}
