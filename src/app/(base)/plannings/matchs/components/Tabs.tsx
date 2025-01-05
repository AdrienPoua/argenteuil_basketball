"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Match from "@/models/Match";
import { useState } from "react";
import Card from "./Card";

const LIST_OF_MONTHS = {
    8: "Septembre",
    9: "Octobre",
    10: "Novembre",
    11: "Décembre",
    0: "Janvier",
    1: "Février",
    2: "Mars",
    3: "Avril",
    4: "Mai",
}

type PropsType = { matchs: ReturnType<Match["toPlainObject"]>[] }

export default function MatchTabs({ matchs }: Readonly<PropsType>) {
    const [filter, setFilter] = useState("all");
    const championnats = Array.from(new Set(matchs.map((match) => match.championnat ?? "Unknown")));

    return (
        <Tabs defaultValue={String(new Date().getMonth())}>
            <TabsList className="flex flex-wrap gap-2 size-full mx-auto mb-10">
                {Object.entries(LIST_OF_MONTHS).map(([index, monthName]) => (
                    <TabsTrigger key={index} value={index} className={'bg-foreground grow'} onClick={() => setFilter("all")}>
                        {monthName}
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
            {Object.entries(LIST_OF_MONTHS).map(([index, month]) => (
                <TabsContent key={index} value={index}>
                    {championnats.map((championnat) => {
                            const matchsByMonth = matchs.filter((match) => match.date.getMonth() === Number(index) && match.championnat === championnat);
                            const homeGames = matchsByMonth.filter((match) => match.isHome);    
                            const awayGames = matchsByMonth.filter((match) => !match.isHome);
                            const displayedGames = filter === "home" ? homeGames : filter === "away" ? awayGames : matchsByMonth;
                            if(!displayedGames.some((match) => match.championnat === championnat)) return null;
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