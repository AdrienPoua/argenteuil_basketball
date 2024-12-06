'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Match } from '@/models';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty, CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


type PropsType = {
  matchs: Match[]
  setSelectedMatchs: Dispatch<SetStateAction<Match[]>>
  selectedMatchs: Match[]
}


export default function MatchSelector({ matchs, setSelectedMatchs, selectedMatchs }: Readonly<PropsType>) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full max-w-sm mx-auto mb-12 rounded-lg ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedMatchs && selectedMatchs.length > 0
              ? `${selectedMatchs.length} matchs selected`
              : "Selectionne les matchs"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search matchs..." />
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandList>
              {matchs.map((match) => (
                <CommandItem
                  key={match.matchNumber}
                  onSelect={() => {
                    // Mise à jour de `selectedMatchs`
                    setSelectedMatchs((prev) =>
                      prev.some((m) => m.matchNumber === match.matchNumber)
                        ? prev.filter((m) => m.matchNumber !== match.matchNumber)
                        : [...prev, match]
                    )
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMatchs.some((m) => m.matchNumber === match.matchNumber)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {match.date} - {match.division} - {match.teamA} vs {match.teamB}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}