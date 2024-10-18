"use client";
import { ReactElement, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getMatchs } from '@/lib/mongo/controllers/matchs';
import { ValidateWithZod } from '@/lib/zod/utils';
import DBMatchschema from '@/lib/zod/schemas/database/MatchSchema';
import SelectMatch from './SelectMatch';
import { Match } from '@/utils/models';
import Adapter from '@/utils/adapters/matchs/fromDBforModel';
import Feedback from '@/components/FetchFeedback';
import { Badge } from '@/components/ui/badge';
import Preview from "@lib/react-email/templates/Convocation";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import useFetchClubs from '@/utils/hooks/DBFetch/useFetchClubs';
import levenshtein from 'fast-levenshtein';

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
    console.log(levenshtein)

    return (
        <Feedback data={matchs} error={error} isLoading={isLoading}>
            <div className="size-full relative">
                {matchs && (
                    <>
                        <Sidebar selectedMatchs={selectedMatchs} matchs={matchs} />
                        <div className="ps-96 flex flex-col justify-center items-center">
                            <SelectMatch matchs={matchs} setSelectedMatchs={setSelectedMatchs} selectedMatchs={selectedMatchs} />
                            <div className="bg-primary size-fit mb-10">
                                <Preview match={MockedMatch} />
                            </div>
                            <ValidationDialog selectedMatchs={selectedMatchs} />
                        </div>
                    </>
                )}
            </div>
        </Feedback >
    )
}

const Sidebar = ({ selectedMatchs, matchs }: Readonly<{ selectedMatchs: Match[], matchs: Match[] }>) => {
    return (
        <div className="absolute inset-y-0 overflow-y-auto w-96 text-background border-2 border-custom ">
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


export function ValidationDialog({ selectedMatchs }: Readonly<{ selectedMatchs: Match[] }>) {
    const { data: clubs, error, isLoading } = useFetchClubs()
    const [clubList, setClubList] = useState<{ club: string, email: string | undefined }[]>([])

    useEffect(() => {
        if (clubs) {
            const clubAndEmailList = selectedMatchs.map((match) => {
                const email = clubs.find((club) => {
                    const distance = levenshtein.get(club.name.split("-")[0].trim(), match.teamB)
                    return distance < 10
                })?.correspondant.email
                return { club: match.teamB, email }
            })
            setClubList(clubAndEmailList)
        }
    }, [clubs, selectedMatchs])

    const handleSubmit = () => {
        console.log(clubList)
    }

    return (
        <Feedback data={clubs} error={error} isLoading={isLoading}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={selectedMatchs.length === 0}>  Envoyer </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Confirmer les adresses emails</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        {clubList?.map((club, index) => (
                            <p key={club.club + index}>
                                {club.club + " : "}
                                {club.email ? club.email : <span style={{ color: 'red' }}> Pas d&apos;email </span>}
                            </p>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={clubList.length === 0} onClick={() => handleSubmit()}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Feedback>
    )
}
