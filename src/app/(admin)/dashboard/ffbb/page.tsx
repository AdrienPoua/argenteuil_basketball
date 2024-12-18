"use client";
import { useQuery } from 'react-query';
import Card from "./Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import getPoules from "@/services/api/getPoules";
import getRencontresParPoules from "@/services/api/getRencontresParPoules";
import useToken from "@/hooks/useToken";
import { Button } from '@/components/ui/button';
import { CreateOrUpdate } from '@/database/controllers/matchs';
import { useState } from 'react';
import getCompetitions from '@/services/api/getCompetitions';
import getCompetitionsDetails from '@/services/api/getCompetitionsDetails';
import { upsert } from '@/database/controllers/competitions';


export default function Page() {
    const { token } = useToken();
    const [transfering, setTransfering] = useState(false);
    const { data: poulesIDS } = useQuery(["poulesID", token], () => getPoules(token as string), { enabled: !!token });
    const { data: competitions } = useQuery(["competitions", token], () => getCompetitions(token as string), { enabled: !!token });
    const { data: matchs } = useQuery(["rencontres", token], () => getRencontresParPoules(token as string, poulesIDS as number[]), { enabled: !!poulesIDS });
    const { data: competitionsDetails } = useQuery(["competitionsDetails", token], () => getCompetitionsDetails(token as string, competitions?.map((compet) => compet.id) ?? []), { enabled: !!competitions });

    if (!matchs || !poulesIDS || !competitions || !competitionsDetails) {
        return <div>Loading...</div>
    }

    const findCompetition = (match: any) => competitions.find((competition) => competition.poules.find((poule) => poule.id === match.idPoule))

    const transfertToDB = async () => {
        try {
            setTransfering(true);
            await Promise.all(matchs.map(async (match) => {
                const competition = findCompetition(match)
                await CreateOrUpdate({ ...match, competition: competition?.code ?? "indefini" });
            }));
            await Promise.all(competitionsDetails.map(async (competition) => {
                upsert(competition[0]);
            }));

        } catch (err) {
            console.error('Error transferring matches:', err);
        }
        finally {
            setTransfering(false);
        }
    }

    return (
        <Tabs defaultValue={competitions[0].id.toString()} className="size-full max-w-full overflow-x-hidden">
            <Button onClick={transfertToDB} className="my-10 mx-auto flex" disabled={transfering}> {transfering ? 'Transfert en cours' : 'Mettre à jour les matchs sur le site'} </Button>
            <TabsList className="flex flex-wrap size-fit mx-auto mb-10">
                {competitions.map((compet) => <TabsTrigger key={compet.id} value={compet.id.toString()}>{compet.code}</TabsTrigger>)}
            </TabsList>
            {competitions.map((compet) =>
                <TabsContent key={compet.id} value={compet.id.toString()} defaultValue={competitions[0].id.toString()} className="grid grid-cols-1 md:grid-cols-5 gap-5"
                >
                    {matchs.filter((match) => compet.poules.some((poule) => poule.id === match.idPoule)).map((match) => <Card key={match.numero} match={{ ...match, competition: compet.code }} />)}
                </TabsContent>
            )}
        </Tabs>
    )
}

