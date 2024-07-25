import { TableCell, Box, Typography, Tooltip } from '@mui/material';
import React from 'react';
import { Match } from "@/utils/models";

const typoClass = "text-black text-center";


const InsideCell = ({ children }: { children: React.ReactNode }) => {
    return (
        <TableCell className="flex flex-col justify-center items-center grow basis-1 relative bg-white">
            <Box className="size-fit">
                {children}
            </Box>
        </TableCell>
    );

}

const NoMatchCell = () => (
    <InsideCell>
        <Typography className={typoClass}> EXEMPT </Typography>
        <Tooltip title="Pas de match">
            <Box className=" after:absolute after:top-0 after:right-0 after:content-['❌'] text-xl" />
        </Tooltip>
    </InsideCell>
);

const AwayMatchCell = ({ match }: { match: Match }) => (
    <InsideCell>
        <Typography className={typoClass}> Déplacement <br /> {match.teamA} </Typography>
        <Box className="flex flex-col">
            <Tooltip title="Match à domicile">
                <Box className=" after:absolute after:top-0 after:right-0 after:content-['🚗'] text-xl" />
            </Tooltip>
            {match.isUpdate && (
                <Tooltip title="Les informations ont changés">
                    <Box className=" after:absolute after:top-8 after:right-0 after:content-['🆕'] text-xl animate-pulse" />
                </Tooltip>
            )}
        </Box>
    </InsideCell >
);

const HomeMatchCell = ({ match }: { match: Match }) => (
    <InsideCell>
        <Typography className={typoClass}>{match.teamA.replace(/ARGENTEUIL BB/i, "ABB")} vs {match.teamB}</Typography>
        <Typography className={typoClass}>{match.date} - {match.time}</Typography>
        <Typography className={typoClass}>{match.gym}</Typography>
        <Tooltip title="Match à domicile">
            <Box className=" after:absolute after:top-0 after:right-0 after:content-['🏠'] text-xl" />
        </Tooltip>
        {match.isUpdate && (
            <Tooltip title="Les informations ont changés">
                <Box className=" after:absolute after:top-8 after:right-0 after:content-['🆕'] text-xl animate-pulse" />
            </Tooltip>
        )}
    </InsideCell>
);

export default function Cell({ match }: Readonly<{ match: Match }>) {
    if (!match || match.isExempt) {
        return <NoMatchCell />;
    } else if (!match.isHome) {
        return <AwayMatchCell match={match} />;
    } else if (match.isHome) {
        return <HomeMatchCell match={match} />;
    }
    return null;
};
