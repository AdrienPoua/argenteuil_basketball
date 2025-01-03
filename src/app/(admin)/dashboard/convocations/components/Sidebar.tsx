import Match from "@/models/Match";
import { Badge } from "@/components/ui/badge";

type PropsType = {
    selectedMatchs: ReturnType<Match["toPlainObject"]>[];
}

export default function Sidebar({ selectedMatchs }: Readonly<PropsType>) {
    return (
        <div className="p-8 w-96 h-full text-foreground border-2 border-custom rounded-xl">
            <h3 className="text-center mb-10">Matchs séléctionés:</h3>
            <div className="flex flex-col gap-2">
                {selectedMatchs?.map((match) => (
                    <Badge key={match.matchNumber} variant="secondary">
                        {`${match.division} - ${match.teamA} vs ${match.teamB}`}
                    </Badge>
                ))}
            </div>
        </div>
    );
}