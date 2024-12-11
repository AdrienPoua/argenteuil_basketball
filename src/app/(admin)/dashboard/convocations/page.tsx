"use client";
import { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { getMatchs } from '@/database/controllers/matchs';
import SelectMatch from './SelectMatch';
import { Match } from '@/models';
import Feedback from '@/components/FetchFeedback';
import { Badge } from '@/components/ui/badge';
import Convocation from '@/services/react-email/templates/Convocation';
import Dialog from './dialog'

const fetchAndProcess = async (): Promise<Match[]> => {
    const matchs = await getMatchs();
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
                        <Sidebar selectedMatchs={selectedMatchs} />
                        <div className=" flex flex-col grow justify-center items-center ">
                            <SelectMatch matchs={matchs} setSelectedMatchs={setSelectedMatchs} selectedMatchs={selectedMatchs} />
                            <div className="bg-primary size-fit mb-10">
                                <Convocation match={MockedMatch} />
                            </div>
                            <Dialog selectedMatchs={selectedMatchs} setSelectedMatchs={setSelectedMatchs} />
                        </div>
                    </div>
                )}
            </div>
        </Feedback >
    )
}

const Sidebar = ({ selectedMatchs }: Readonly<{ selectedMatchs: Match[] }>) => {
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



