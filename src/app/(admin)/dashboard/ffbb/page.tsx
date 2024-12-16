"use client";
import { useQuery } from 'react-query';
import Card from "./Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import getPoules from "@/services/api/getPoules";
import getRencontresParPoules from "@/services/api/getRencontresParPoules";
import getRanking from "@/services/api/getRanking";
import useToken from "@/hooks/useToken";
import { Button } from '@/components/ui/button';
import { CreateOrUpdate } from '@/database/controllers/matchs';
import { useState } from 'react';
import getCompetitions from '@/services/api/getCompetitions';
import BasketballRankingTable from '@/components/RankingTable';
import { updateRank } from '@/database/controllers/rank';


export default function Page() {
    const { token } = useToken();
    const [transfering, setTransfering] = useState(false);
    const { data: poulesIDS } = useQuery(["poulesID", token], () => getPoules(token as string), { enabled: !!token });
    const { data: competitions } = useQuery(["competitions", token], () => getCompetitions(token as string), { enabled: !!token });
    const { data: matchs } = useQuery(["rencontres", token, poulesIDS], () => getRencontresParPoules(token as string, poulesIDS as number[]), { enabled: !!poulesIDS });
    const { data: ranking } = useQuery(["ranking", token, poulesIDS], () => getRanking(token as string, poulesIDS as number[]), { enabled: !!poulesIDS });
    if (!matchs || !poulesIDS || !competitions || !ranking) {
        return <div>Loading...</div>
    }
    const findCompetition = (match: any) => competitions.find((competition) => competition.poules.find((poule) => poule.id === match.idPoule))

    const transfertToDB = async () => {
        try {
            setTransfering(true);
            // await Promise.all(matchs.map(async (match) => {
            //     const competition = findCompetition(match)
            //     await CreateOrUpdate({ ...match, competition: competition?.code ?? "indefini" });
            // }));

            console.log("🚀 ~ Page ~ ranking:", ranking)
            await updateRank(ranking)
            console.log(ranking)
        } catch (err) {
            console.error('Error transferring matches:', err);
        }
        finally {
            setTransfering(false);
        }
    }

    return (
        <>
            <Tabs defaultValue={competitions[0].code} className="size-full max-w-full overflow-x-hidden">
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
        </>
    )
}

const mockTeamStats = [
    {
        organisme: { id: 1, libelle: "Les Aigles", code: "AIG" },
        matchJoues: 10, points: 18, position: 1, gagnes: 9, perdus: 1, nuls: 0,
        pointsInitiaux: 0, penalitesArbitrage: 0, penalitesEntraineur: 0, penalitesDiverses: 0,
        nombreForfaits: 0, nombreDefauts: 0, paniersMarques: 720, paniersEncaisses: 650,
        quotient: 1.108, difference: 70, horsClassement: false
    },
    {
        organisme: { id: 2, libelle: "Les Lions", code: "LIO" },
        matchJoues: 10, points: 16, position: 2, gagnes: 8, perdus: 2, nuls: 0,
        pointsInitiaux: 0, penalitesArbitrage: 1, penalitesEntraineur: 0, penalitesDiverses: 0,
        nombreForfaits: 0, nombreDefauts: 0, paniersMarques: 700, paniersEncaisses: 680,
        quotient: 1.029, difference: 20, horsClassement: false
    },
    {
        organisme: { id: 3, libelle: "Les Tigres", code: "TIG" },
        matchJoues: 10, points: 14, position: 3, gagnes: 7, perdus: 3, nuls: 0,
        pointsInitiaux: 0, penalitesArbitrage: 0, penalitesEntraineur: 1, penalitesDiverses: 0,
        nombreForfaits: 0, nombreDefauts: 0, paniersMarques: 690, paniersEncaisses: 670,
        quotient: 1.030, difference: 20, horsClassement: false
    },
    {
        organisme: { id: 4, libelle: "Les Panthères", code: "PAN" },
        matchJoues: 10, points: 12, position: 4, gagnes: 6, perdus: 4, nuls: 0,
        pointsInitiaux: 0, penalitesArbitrage: 0, penalitesEntraineur: 0, penalitesDiverses: 1,
        nombreForfaits: 0, nombreDefauts: 0, paniersMarques: 680, paniersEncaisses: 685,
        quotient: 0.993, difference: -5, horsClassement: false
    },
    {
        organisme: { id: 5, libelle: "Les Loups", code: "LOU" },
        matchJoues: 10, points: 10, position: 5, gagnes: 5, perdus: 5, nuls: 0,
        pointsInitiaux: 0, penalitesArbitrage: 0, penalitesEntraineur: 0, penalitesDiverses: 0,
        nombreForfaits: 1, nombreDefauts: 0, paniersMarques: 650, paniersEncaisses: 660,
        quotient: 0.985, difference: -10, horsClassement: false
    },
    {
        organisme: { id: 6, libelle: "Les Ours", code: "OUR" },
        matchJoues: 10, points: 8, position: 6, gagnes: 4, perdus: 6, nuls: 0,
        pointsInitiaux: 0, penalitesArbitrage: 2, penalitesEntraineur: 1, penalitesDiverses: 0,
        nombreForfaits: 0, nombreDefauts: 1, paniersMarques: 630, paniersEncaisses: 670,
        quotient: 0.940, difference: -40, horsClassement: false
    },
];
