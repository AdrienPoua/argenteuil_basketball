"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { updateClubs, updateMatchs } from './actions/server.actions';
import { useFFBB } from './actions/client.server';
import Card from './components/Card';

export default function Page() {
    const [transfering, setTransfering] = useState(false);
    const { poulesIDS, competitions, matchs, competitionsDetails } = useFFBB()
    if (!matchs || !poulesIDS || !competitions || !competitionsDetails) {
        return <div>Loading...</div>
    }
    const clubsUpdate = async () => {
        try {
            setTransfering(true)
            await updateClubs(competitionsDetails)
        } catch (err) {
            console.error('Error transferring matches:', err);
        }
        finally {
            setTransfering(false)
        }
    }
    const matchsUpdate = async () => {
        try {
            setTransfering(true)
            await updateMatchs(matchs, competitions)
        } catch (err) {
            console.error('Error transferring matchs:', err);
        }
        finally {
            setTransfering(false)
        }
    }


    return (
        <Tabs defaultValue={competitions[0].id.toString()} className="size-full max-w-full overflow-x-hidden">
            <Button onClick={() => clubsUpdate()} className="my-10 mx-auto flex" disabled={transfering} > Mettre a jour les clubs</Button>
            <Button onClick={() => matchsUpdate()} className="my-10 mx-auto flex" disabled={transfering} > Mettre a jour les matchs</Button>
            <TabsList className="flex flex-wrap size-fit mx-auto mb-10">
                {competitions.map((compet) => <TabsTrigger key={compet.id} value={compet.id.toString()}>{compet.code}</TabsTrigger>)}
            </TabsList>
            {competitions?.map((compet) => {
                const filteredMatchs = matchs?.filter((match) => compet.poules.some((poule) => poule.id === match.idPoule)) || [];
                return (
                    <TabsContent key={compet.id} value={compet.id.toString()} className="grid grid-cols-1 md:grid-cols-5 gap-5">
                        {filteredMatchs.map((match) => (
                            <Card key={match.numero} match={{ ...match, competition: compet.code }} />
                        ))}
                    </TabsContent>
                );
            })}
        </Tabs>
    )
}

