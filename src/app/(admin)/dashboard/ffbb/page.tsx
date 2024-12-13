"use client";
import { useQuery } from 'react-query';
import Card from "./Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import fetchPoules from "./fetchPoules";
import fetchRencontresParPoules from './fetchRencontresParPoules';
import useToken from "@/hooks/useToken";
import { Button } from '@/components/ui/button';
import { CreateOrUpdate } from '@/database/controllers/matchs';
import { useState } from 'react';


export default function Page() {
    const { token } = useToken();
    const [transfering, setTransfering] = useState(false);
    const { data: poulesIDS } = useQuery(["poulesID", token], () => fetchPoules(token as string), { enabled: !!token });
    const { data: matchs } = useQuery(["rencontres", token, poulesIDS], () => fetchRencontresParPoules(token as string, poulesIDS as number[]), { enabled: !!poulesIDS });
    if (!matchs || !poulesIDS) {
        return <div>Loading...</div>
    }
    const poules = Object.groupBy(matchs, (match) => match.idPoule);
    const transfertToDB = async () => {
        try {
            setTransfering(true);
            await Promise.all(matchs.map(async (match) => {
                await CreateOrUpdate(match);
            }));
        } catch (err) {
            console.error('Error transferring matches:', err);
        }
        finally {
            setTransfering(false);
        }
    }

    return (
        <Tabs defaultValue={Object.keys(poules)[0]} className="size-full max-w-full overflow-x-hidden">
            <Button onClick={transfertToDB} className="my-10 mx-auto flex" disabled={transfering}> {transfering ? 'Transfert en cours' : 'Mettre à jour les matchs sur le site'} </Button>
            <TabsList className="flex size-fit mx-auto mb-10">
                {Object.keys(poules).map((poule) => <TabsTrigger key={poule} value={poule}>{poule.slice(-4)}</TabsTrigger>)}
            </TabsList>
            {Object.keys(poules).map((poule) =>
                <TabsContent key={poule} value={poule} className="grid grid-cols-1 md:grid-cols-5 gap-5"
                >
                    {matchs.filter((match) => match.idPoule === parseInt(poule, 10)).map((match) => <Card key={match.numero} match={match} />)}
                </TabsContent>
            )}
        </Tabs>
    )
}
