"use client";
import teamsData from "@/data/teams.json";
import playersData from "@/data/players.json";
import { MemberFactory } from "@/factories";
import { AdherentType, PlayerType } from "@/types";
import { Team, Player } from "@/models";
import TeamCard from "@/components/Card";
import CardLayout from "@/components/layouts/CardLayout";
import { v4 as uuidv4 } from "uuid";


export default function Index() {
  const isPlayer = (member: AdherentType): member is PlayerType => {
    return member instanceof Player;
  };
  const players: PlayerType[] = playersData?.players
    .map((player) => MemberFactory.create(player, "player"))
    .filter(isPlayer);

    const teams = teamsData
        .map((team) => MemberFactory.create(team, "team"))
        .filter((team): team is Team => team instanceof Team)
        .map((team) => { team.players = players; return team; })
console.log(teams)  
  return (
    <CardLayout pageTitle='Nos équipes '>
      <div className="flex flex-col grow gap-5 mx-20">
      {teams.map((team, index) => (
        <TeamCard key={uuidv4()} data={team} />
      ))}
      </div>
    </CardLayout>
  );
}
