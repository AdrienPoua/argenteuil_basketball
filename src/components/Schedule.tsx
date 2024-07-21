import { Table, TableCell, TableHead, TableRow, TableBody, Box, TableContainer, Paper, Typography, Tooltip } from '@mui/material'
import React from 'react'
import { Match } from "@/utils/models"




const tablecellClass = `flex flex-col justify-center items-center text-black grow basis-1 relative bg-white`;
const typoClass = "text-black text-center";

const NoMatch = () => (
    <TableCell className={tablecellClass}>
        <Box className="size-fit">
            <Typography className={typoClass}> EXEMPT </Typography>
            <Tooltip title="Pas de match">
                <Box className=" after:absolute after:top-0 after:right-0 after:content-['❌'] text-xl" />
            </Tooltip>
        </Box>
    </TableCell>
);

const AwayMatch = ({ match }: { match: Match }) => (
    <TableCell className={tablecellClass}>
        <Box className="size-fit">
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
        </Box>
    </TableCell>
);

const HomeMatch = ({ match }: { match: Match }) => (
    <TableCell className={tablecellClass}>
        <Typography className={typoClass}>{match.teamA.replace(/ARGENTEUIL BB/i, "ABB")} vs {match.teamB}</Typography>
        <Typography className={typoClass}>{match.date} - {match.time}</Typography>
        <Typography className={typoClass}>{match.gym}</Typography>
        <Tooltip title="Match à domicile">
            <Box className=" after:absolute after:top-0 after:right-0 after:content-['🏠'] text-xl" />
        </Tooltip>
        {match.isUpdate && (
            <Tooltip title="contenu mis à jour">
                <Box className=" after:absolute after:top-8 after:right-0 after:content-['🆕'] text-xl" />
            </Tooltip>
        )}
    </TableCell>
);

const Cellule = ({ match }: { match: Match }) => {
    if (!match) {
        return <NoMatch />;
    } else if (!match.home) {
        return <AwayMatch match={match} />;
    } else if (match.home) {
        return <HomeMatch match={match} />;
    }
    return null;
};


type ScheduleProps = {
    matchs: Match[]
    title: string
}

export default function Schedule({ matchs, title }: Readonly<ScheduleProps>) {
    const categories = matchs.reduce((acc, match) => {
        if (!acc.includes(match.division)) {
            acc.push(match.division)
        }
        return acc
    }, [] as string[])

    const days = matchs.reduce((acc, match) => {
        const day = match.day
        if (!acc.includes(day)) {
            acc.push(day)
        }
        return acc
    }, [] as number[])

    const weekends = days
        .toSorted((a, b) => a - b)
        .filter((day, index, array) => index === 0 || array[index - 1] !== day - 1)
        .map((day) => day.toString() + ' / ' + (day + 1).toString())

    const width = "max-w-40 min-w-40 flex justify-center items-center"


    return (
        <TableContainer component={Paper}>
            <Table className="bg-primary min-w-[500px] ">
                <TableHead>
                    <TableRow className='text-center my-5' >
                        <TableCell className="text-center text-6xl text-white py-10">{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className="hidden">
                        <TableCell className={width} />
                        {weekends.map((weekend, index) => (
                            <TableCell key={weekend + index}
                                className={`flex justify-center items-center grow basis-1 `}
                            >{weekend}</TableCell>
                        ))}
                    </TableRow>
                    {categories.map((category) => (
                        <TableRow key={category} className="flex">
                            <TableCell className={width}> {category}</TableCell>
                            {weekends.map((weekend, index) => (
                                <Cellule
                                    key={weekend + category}
                                    match={matchs.find((match) => weekend.includes(match.day.toString()) && category.includes(match.division)) as Match} />
                            ), matchs)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
