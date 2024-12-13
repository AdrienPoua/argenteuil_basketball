"use client";
import Card from "./Card"
import { useQuery } from 'react-query';
import { getMatchs } from "@/database/controllers/matchs";

export default function Page() {
    const { data: matchs } = useQuery(["matchs"], () => getMatchs());

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Aperçu de la carte de match</h1>
            {/* { matchs && matchs.map((match) => <Card key={match.numero} match={match} />)} */}
        </div>
    )
}