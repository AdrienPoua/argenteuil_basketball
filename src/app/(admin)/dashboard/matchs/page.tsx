"use client";
import Card from "./Card"
import { useQuery } from 'react-query';
import { getMatchs } from "@/database/services/matchs";

export default function Page() {
    const { data: matchs } = useQuery(["matchs"], () => getMatchs().then((matchs) => matchs.map(match => ({...match, date: new Date(match.date)}))));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Aperçu de la carte de match</h1>
            <div className="grid grid-cols-4 gap-3"> 
            {matchs && matchs.map((match) => <Card key={match.numero} match={match} />)}
            </div>
        </div>
    )
}