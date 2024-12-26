'use client'

import { useState } from "react";
import { Check, ChevronsUpDown } from 'lucide-react';
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
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/utils/cn";
import { useQuery } from "react-query";
import { getTeams } from "./actions";
import { z } from "zod";
import { formSchema } from "./Utils";

type PropsType = {
    form: UseFormReturn<z.infer<typeof formSchema>>
}


export default function MatchSelector({ form }: Readonly<PropsType>) {
    const [open, setOpen] = useState(false)
    const { data: teams } = useQuery({ queryKey: ['teams'], queryFn: getTeams })
    if (!teams) return <div>Loading...</div>


    return (
        <div className="w-full max-w-sm mx-auto mb-12 rounded-lg ">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {form.getValues('teams') && form.getValues('teams').length > 0
                            ? `${form.getValues('teams').length} équipes sélectionnées`
                            : "Selectionne les équipes"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search matchs..." />
                        <CommandEmpty>No match found.</CommandEmpty>
                        <CommandList>
                            {teams.map((team) => (
                                <CommandItem
                                    key={team.id}
                                    onSelect={() => {
                                        form.setValue('teams', [...form.getValues('teams'), team])
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            form.getValues('teams').some((t: any) => t.id === team.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    team.name
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
