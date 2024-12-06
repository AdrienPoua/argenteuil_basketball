import React, { ReactElement } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip from Shadcn UI
import { TableCell } from "@/components/ui/table"; // Shadcn UI TableCell
import { Button } from "@/components/ui/button";
import { Match } from "@/models";


const typoClass = "text-black text-center";

// Component for handling the content inside the table cell
const InsideCell = ({ children }: { children: React.ReactNode }): ReactElement => {
    return (
        <TableCell className="flex flex-col justify-center items-center grow basis-1 relative bg-white p-4">
            {children}
        </TableCell>
    );
}

// Component for a cell with no match (exempt)
const NoMatchCell = (): ReactElement => (
    <InsideCell>
        <p className={typoClass}>EXEMPT</p>
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild className="absolute top-0 right-0">
                    <Button variant="ghost">❌</Button>
                </TooltipTrigger>
                <TooltipContent>
                    Pas de match
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </InsideCell>
);

// Component for an away match
const AwayMatchCell = ({ match }: { match: Match }): ReactElement => (
    <InsideCell>
        <p className={typoClass}>Déplacement<br />{match.teamA}</p>
        {match.time !== "00:00" && <p className={typoClass}>{match.date} - {match.time}<br />{match.gym}</p>}
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild className="absolute top-0 right-0">
                    <Button variant="ghost">🚗</Button>
                </TooltipTrigger>
                <TooltipContent>
                    Match à l&apos;exterieur
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </InsideCell>
);

// Component for a home match
const HomeMatchCell = ({ match }: { match: Match }): ReactElement => (
    <InsideCell>
        <p className={typoClass}>{match.teamA.replace(/ARGENTEUIL BB/i, "ABB")} vs {match.teamB}</p>
        <p className={typoClass}>{match.date} - {match.time}</p>
        <p className={typoClass}>{match.gym}</p>
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild className="absolute top-0 right-0">
                    <Button variant="ghost">🏠</Button>
                </TooltipTrigger>
                <TooltipContent>
                    Match à domicile
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </InsideCell>
);

// Main Cell component to render based on match data
export default function Cell({ match }: Readonly<{ match: Match }>): ReactElement | null {
    if (!match || match.isExempt) {
        return <NoMatchCell />;
    } else if (!match.isHome) {
        return <AwayMatchCell match={match} />;
    } else if (match.isHome) {
        return <HomeMatchCell match={match} />;
    }
    return null;
};
