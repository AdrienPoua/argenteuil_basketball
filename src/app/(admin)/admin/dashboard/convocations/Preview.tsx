"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Match } from "@/utils/models";
import { open, setContent } from "@/lib/redux/slices/modal";
import { Convocation } from "@/lib/react-email/templates";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type PropsType = {
  matchs: Match[];
  selectedMatch: Match[];
  setSelectedMatch: (match: Match[]) => void;
};

export default function Index({
  selectedMatch,
  setSelectedMatch,
}: Readonly<PropsType>) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isSelectedMatch = selectedMatch.length > 0;
  const isMultipleMatch = selectedMatch.length > 1;

  const handleClick = () => {
    dispatch(open());
    dispatch(
      setContent(
        <Modal matchs={selectedMatch} isChecked={isChecked} setSelectedMatch={setSelectedMatch} />
      )
    );
  };

  return (
    <form className="flex flex-col justify-center items-center gap-5 grow">
      {/* Checkbox and Label */}
      <div className="flex justify-center items-center gap-5">
        <Checkbox
          id="modif-checkbox"
          onCheckedChange={() => setIsChecked((prev) => !prev)}
          checked={isChecked}
        />
        <Label htmlFor="modif-checkbox" className="text-sm text-muted-foreground">
          Cette convocation est une convocation modificative
        </Label>
      </div>

      {/* Convocation Component */}
      {isSelectedMatch && (
        <Convocation
          match={selectedMatch[0]}
          isModif={isChecked}
          isExemple={isMultipleMatch}
        />
      )}

      {/* Submit Button */}
      <Button
        onClick={handleClick}
        disabled={!isSelectedMatch}
        className="bg-primary text-white w-full max-w-xs"
      >
        Envoyer
      </Button>
    </form>
  );
}
