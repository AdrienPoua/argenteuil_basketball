"use client";
import { ReactElement, useState, Dispatch, SetStateAction } from 'react';

import { useQuery } from 'react-query';
import { getMatchs } from '@/lib/mongo/controllers/matchs';
import { ValidateWithZod } from '@/lib/zod/utils';
import DBMatchschema from '@/lib/zod/schemas/database/MatchSchema';
import SelectMatch from './SelectMatch';
import { Match } from '@/utils/models';
import Adapter from '@/utils/adapters/matchs/fromDBforModel';
import Feedback from '@/components/FetchFeedback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import useConvocation from './use-convocation';
import Convocation from '@/lib/react-email/templates/Convocation';


const fetchAndProcess = async (): Promise<Match[]> => {
    const matchs = await getMatchs();
    ValidateWithZod(matchs, DBMatchschema);
    const MatchsModels = matchs.map((match) => new Match(Adapter(match)));
    return MatchsModels.filter((match) => match.isHome && match.teamB !== 'Exempt');
}
const MockedMatch = new Match({
    division: "EXEMPLE",
    matchNumber: "EXEMPLE",
    teamA: "ABB",
    teamB: "EXEMPLE",
    date: "EXEMPLE",
    time: "EXEMPLE",
    gym: "EXEMPLE"
});

export default function Index(): ReactElement {
    const [selectedMatchs, setSelectedMatchs] = useState<Match[]>([]);
    const { data: matchs, isLoading, error } = useQuery('matchs', fetchAndProcess);

    return (
        <Feedback data={matchs} error={error} isLoading={isLoading}>
            <div className="size-full relative">
                {matchs && (
                    <div className=" flex h-full">
                        <MatchPreview selectedMatchs={selectedMatchs} />
                        <div className=" flex flex-col grow justify-center items-center ">
                            <SelectMatch matchs={matchs} setSelectedMatchs={setSelectedMatchs} selectedMatchs={selectedMatchs} />
                            <div className="bg-primary size-fit mb-10">
                                <Convocation match={MockedMatch} />
                            </div>
                            <ValidationDialog selectedMatchs={selectedMatchs} setSelectedMatchs={setSelectedMatchs} />
                        </div>
                    </div>
                )}
            </div>
        </Feedback >
    )
}

const MatchPreview = ({ selectedMatchs }: Readonly<{ selectedMatchs: Match[] }>) => {
    return (
        <div className=" p-8 w-96 h-full text-foreground border-2 border-custom rounded-xl ">
            <h3 className="text-center mb-10">Matchs séléctionés:</h3>
            <div className="flex flex-col gap-2">
                {selectedMatchs?.map((match) => (
                    <Badge key={match.matchNumber} variant="secondary">
                        {`${match.division} - ${match.teamA} vs ${match.teamB}`}
                    </Badge>
                ))}
            </div>
        </div>
    )
}



export function ValidationDialog({ selectedMatchs, setSelectedMatchs }: Readonly<{ selectedMatchs: Match[], setSelectedMatchs: Dispatch<SetStateAction<Match[]>> }>) {
    const { data, error, isLoading, payload, isSending, handleSubmit } = useConvocation({ selectedMatchs })
    return (
        <Feedback data={data} error={error} isLoading={isLoading}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={selectedMatchs.length === 0}>  Envoyer </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Confirmer les adresses emails</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                        {payload?.map((club, index) => (
                            <div key={club.club + index} className="flex justify-between items-center p-2 border rounded-md">
                                <span className="font-medium">{club.club}</span>
                                {club.email ? (
                                    <span>{club.email}</span>
                                ) : (
                                    <span className="text-red-500">Pas d&apos;email</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" disabled={payload.length === 0 || isSending} onClick={() => { handleSubmit(); setSelectedMatchs([]); }}>Envoyer</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Feedback>
    )
}
