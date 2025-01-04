"use client";
import { useState } from "react";
import { PropsType } from "../types/grid.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Card from "../components/Card";

export default function Grid({ matchs }: Readonly<PropsType>) {
  const [selectedCompetition, setSelectedCompetition] = useState("PRM");
  const competitions = Array.from(new Set(matchs.map(match => match.competition ?? 'Unknown')));
  console.log("🚀 ~ Grid ~ competitions:", competitions)

  return (
    <div className="flex flex-col gap-3">
      <Select onValueChange={setSelectedCompetition} defaultValue="PRM" >
        <SelectTrigger className="font-secondary text-sm bg-foreground">
          <SelectValue placeholder="Select a competition"/>
        </SelectTrigger>
        <SelectContent>
          {competitions.map((competition) => (
            <SelectItem key={competition} value={competition} className="font-secondary text-sm">
              {competition}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-4 gap-3">
        {matchs.filter(match => match.competition === selectedCompetition).map((match, index) => (
          <Card key={`${match.matchNumber}-${index}`} match={match} />
        ))}
      </div>
    </div>
  );
}