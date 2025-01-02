"use client";
import { useState } from "react";
import Team from "@/models/Team";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type PropsType = {
    data: ReturnType<Team['toPlainObject']>
}

export default function TeamCard({ data }: Readonly<PropsType>) {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Card
            onClick={() => setIsClicked(!isClicked)}
            className="w-full h-[300px] md:h-[600px] border-none overflow-hidden relative rounded-lg shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 cursor-pointer"
        >
            <div className={`absolute inset-0 bg-black ${isClicked ? "bg-opacity-75" : "bg-opacity-10"} transition-opacity duration-300 z-10`} />
            <Image
                src={data.image}
                alt={`Les membres de l'équipe ${data.name}`}
                className="object-cover w-full h-full absolute inset-0"
                layout="fill"
            />
            <CardContent className="relative flex flex-col items-center justify-center z-20 size-full ">
                {!isClicked ? (
                    <h3 className="text-white text-2xl md:text-5xl">{data.name}</h3>
                ) : (
                    <div className="flex flex-col size-full mt-12">
                        <h3 className="text-white text-3xl lg:text-4xl text-center">{data.name}</h3>
                        <div className="flex grow justify-between">
                            <div className="flex flex-col gap-5 justify-center grow basis-1/2">
                                {data.coach && (
                                    <p className="md:text-lg lg:text-3xl mb-8 text-center">
                                        Coach <span className="text-primary">{data.coach.name}</span>
                                    </p>
                                )}
                                <p className="md:text-lg lg:text-3xl mb-8 text-center">
                                    {data.isCompetition ? "Championnat" : "Départemental"}
                                </p>
                            </div>
                            <div className="flex flex-col gap-5 justify-center grow basis-1/2">
                                <p className="text-base md:text-lg lg:text-3xl text-center text-primary">Entrainements</p>
                                {data.sessions.map((session) => (
                                    <p key={session.day + session.start + session.end + session.gymnase} className="text-center text-xs md:text-lg lg:text-3xl">
                                        {`${session.day} ${session.start} - ${session.end} ${session.gymnase}`}
                                    </p>
                                ))}
                                </div>
                            </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
