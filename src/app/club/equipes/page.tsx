"use client";
import teamsData from "@/data/teams.json";
import { MemberFactory } from "@/factories";
import { TeamType } from "@/types";
import { Team } from "@/models";
import TeamCard from "@/components/Card";
import CardLayout from "@/components/layouts/CardLayout";

export default function Index() {
  // const isPlayer = (member: AdherentType): member is PlayerType => {
  //   return member instanceof Player;
  // };
  // const players = playersData.players
  //   .map((player) => MemberFactory.create(player, "player"))
  //   .filter(isPlayer);

  const teams = teamsData?.teams
    ?.map((team) => MemberFactory.create(team, "team"))
    .filter((team) => team instanceof Team) as TeamType[];
  console.log("🚀 ~ Index ~ teams:", teams);

  return (
    <CardLayout pageTitle="Nos équipes ">
        {teams.map((team) => (
          <TeamCard key={team.name} data={team} />
        ))}
    </CardLayout>
  );
}