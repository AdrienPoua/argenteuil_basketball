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
    DialogTrigger,
} from "@/components/ui/dialog";
import useFetchClubs from '@/utils/hooks/DBFetch/useFetchClubs';
import levenshtein from 'fast-levenshtein';
import sendConvocation from '@/lib/nodemailer/sendConvocationEmail';
import { render } from '@react-email/components';
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
                                <Preview match={MockedMatch} />
                            </div>
                            <ValidationDialog selectedMatchs={selectedMatchs} />
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


export function ValidationDialog({ selectedMatchs }: Readonly<{ selectedMatchs: Match[] }>) {
    const { data: clubs, error, isLoading } = useFetchClubs()
    const [isSending, setIsSending] = useState(false)
    const [payload, setPayload] = useState<{ match: Match, club: string, email: string | undefined, matchNumber: string, division: string }[]>([])

    useEffect(() => {
        if (clubs) {
            const currentPayload = selectedMatchs.map((match) => {
                const email = clubs.find((club) => {
                    const distance = levenshtein.get(club.name.split("-")[0].trim(), match.teamB)
                    return distance < 10
                })?.correspondant.email
                return { club: match.teamB, email, matchNumber: match.matchNumber, division: match.division, match }
            })
            setPayload(currentPayload)
        }
    }, [clubs, selectedMatchs])

    const handleSubmit = async () => {
        setIsSending(true)
        try {
            for (const item of payload) {
                if (item.email) {
                    const convocation = render(<Convocation match={item.match} />);
                    await sendConvocation({
                        to: item.email,
                        html: convocation,
                        subject: `Convocation pour le match ${item.matchNumber} en ${item.division}`,
                        division: item.division,
                    });
                }
            }
        } catch (error) {
            console.error("Error sending convocation emails:", error);
        } finally {
            setIsSending(false)
        }
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
                        <Button type="submit" disabled={payload.length === 0 || isSending} onClick={handleSubmit}>Envoyer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Feedback>
    )
}
