"use client";

import { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { Match } from "@/utils/models";
import { getMatchs } from "@/lib/mongo/controllers/matchs";
import { ValidateWithZod } from "@/lib/zod/utils/index";
import DBMatchschema from "@/lib/zod/schemas/database/MatchSchema";
import Adapter from "@/utils/adapters/matchs/fromDBforModel";
import { Derogation } from "@/lib/react-email/templates";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { open, setContent } from "@/lib/redux/slices/modal";
import Feedback from "@/components/FetchFeedback";
import Info from "@/components/Info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select"; // Assume a Select component exists in ShadCN UI

const FetchAndProcess = async (): Promise<Match[]> => {
  const matchs = await getMatchs();
  ValidateWithZod(matchs, DBMatchschema);
  const MatchsModels = matchs.map((match) => new Match(Adapter(match)));
  const awayMatchs = MatchsModels.filter((match) => !match.isHome);
  return awayMatchs;
};

export default function Index(): ReactElement {
  const dispatch = useDispatch();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [reason, setReason] = useState<string>("");
  const [proposition, setProposition] = useState<string>("");
  const { data: matchs, isLoading, error } = useQuery("matchs", FetchAndProcess);

  if (matchs?.length === 0) return <Info content="Aucun match dans la base de données" />;

  const handleMatchChange = (value: string) => {
    const selectedMatch = matchs?.find((match) => match.matchNumber === value) || null;
    setSelectedMatch(selectedMatch);
  };

  const handleClick = () => {
    if (selectedMatch) {
      dispatch(open());
      dispatch(setContent(<Modal match={selectedMatch} setSelectedMatch={setSelectedMatch} reason={reason} proposition={proposition} />));
    }
  };

  return (
    <Feedback data={matchs} error={error} isLoading={isLoading}>
      <div className="flex flex-col gap-5 w-[80%] m-auto">
        <div className="text-black flex flex-col">
          {/* Match Selection */}
          <Label htmlFor="match-select" className="text-black mb-2">
            Match
          </Label>
          <Select onValueChange={handleMatchChange} defaultValue={selectedMatch?.matchNumber ?? ""}>
          </Select>
          {/* Reason Input */}
          <Label htmlFor="reason-input" className="text-black mt-4">
            Raison
          </Label>
          <Input
            id="reason-input"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Entrez la raison"
          />

          {/* Proposition Input */}
          <Label htmlFor="proposition-input" className="text-black mt-4">
            Proposition
          </Label>
          <Input
            id="proposition-input"
            value={proposition}
            onChange={(e) => setProposition(e.target.value)}
            placeholder="Entrez une proposition"
          />

          {/* Derogation display */}
          {selectedMatch && (
            <Derogation match={selectedMatch} reason={reason} proposition={proposition} />
          )}

          {/* Submit Button */}
          <Button className="mt-10 w-fit mx-auto" onClick={handleClick} disabled={!selectedMatch}>
            Envoyer
          </Button>
        </div>
      </div>
    </Feedback>
  );
}
