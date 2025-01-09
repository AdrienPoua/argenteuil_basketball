"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Match from "@/models/Match";
import { useState } from "react";
import Card from "./Card";

const LIST_OF_MONTHS = [
    { month: 8, name: "Septembre" },
    { month: 9, name: "Octobre" },
    { month: 10, name: "Novembre" },
    { month: 11, name: "Décembre" },
    { month: 0, name: "Janvier" },
    { month: 1, name: "Février" },
    { month: 2, name: "Mars" },
    { month: 3, name: "Avril" },
    { month: 4, name: "Mai" }
];


type PropsType = { matchs: ReturnType<Match["toPlainObject"]>[] }

export default function MatchTabs({ matchs }: Readonly<PropsType>) {
    const [filter, setFilter] = useState("all");
    const championnats = Array.from(new Set(matchs.map((match) => match.championnat ?? "Unknown")));

    return (
        <Tabs defaultValue={String(new Date().getMonth())}>
            <TabsList className="flex flex-wrap gap-2 size-full mx-auto mb-10">
                {LIST_OF_MONTHS.map(({ month, name }) => (
                    <TabsTrigger
                        key={month}
                        value={String(month)}
                        className="bg-foreground grow"
                        onClick={() => setFilter("all")}
                    >
                        {name}
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="flex justify-center gap-2 mb-10">
                <Button onClick={() => setFilter("home")}>
                    Domiciles
                </Button>
                <Button onClick={() => setFilter("away")}>
                    Extérieurs
                </Button>
                <Button onClick={() => setFilter("all")}>
                    tous
                </Button>
            </div>
            {LIST_OF_MONTHS.map(({ month, name }) => (
                <TabsContent key={month} value={String(month)}>
                    {championnats.map((championnat) => {
                        const matchsByMonth = matchs.filter((match) => match.date.getMonth() === month && match.championnat === championnat);
                        const homeGames = matchsByMonth.filter((match) => match.isHome);
                        const awayGames = matchsByMonth.filter((match) => !match.isHome);
                        const displayedGames = filter === "home" ? homeGames : filter === "away" ? awayGames : matchsByMonth;
                        if (!displayedGames.some((match) => match.championnat === championnat)) return null;
                        return (
                            <div key={championnat} className="mb-5">
                                <div className={`grid gap-4 grid-cols-1 md:grid-cols-5`}>
                                    <div className="">
                                        <Badge className="flex justify-center items-center grow size-full text-3xl">
                                            {championnat}
                                        </Badge>
                                    </div>
                                    {displayedGames.sort((a, b) => a.date.getTime() - b.date.getTime()).map((match) => (
                                        <Card key={match.id} match={match} />
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </TabsContent>
            ))}
        </Tabs>
    );
}