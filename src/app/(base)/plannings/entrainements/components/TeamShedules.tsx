import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Team from "@/models/Team";

interface TeamSchedulesProps {
    teams: ReturnType<Team['toPlainObject']>[];
}

export function TeamSchedules({ teams }: Readonly<TeamSchedulesProps>) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
                <Card
                    key={team.id}
                    className={`font-secondary p-3 bg-cover bg-center relative min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300`}
                    style={{ backgroundImage: `url(${team.image})` }}
                >
                    <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:bg-black/70" />

                    <div className="relative z-10 h-full">
                        <CardHeader className="mb-3">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <CardTitle className="text-white text-2xl font-bold">{team.name}</CardTitle>
                                    <p className="text-gray-200">
                                        Coach: {team.coach?.name ?? "A definir"}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-full">
                            <div className="space-y-3 text-white flex flex-col justify-center">
                                <p className="flex items-center gap-2">
                                    <strong className="text-primary">Competition:</strong>
                                    <span>{team.isCompetition ? "Oui" : "Non"}</span>
                                </p>
                                {team.championnats.length > 0 && (
                                    <p className="flex flex-wrap items-center gap-2">
                                        <strong className="text-primary">Championnats:</strong>
                                        <span>{team.championnats.join(", ")}</span>
                                    </p>
                                )}
                                <div className="space-y-2">
                                    <strong className="text-primary block">Entrainements:</strong>
                                    <ul className="list-none space-y-2">
                                        {team.sessions.map((session, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-100">
                                                <span className="text-primary">•</span>
                                                {session.day}: {session.start} - {session.end}
                                                <span className="text-primary">{session.gymnase}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    );
}

