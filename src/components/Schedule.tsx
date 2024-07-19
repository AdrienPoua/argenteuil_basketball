import { Table, TableCell, TableHead, TableRow, TableBody, Box, TableContainer, Paper, Typography } from '@mui/material'
import React from 'react'
import { Match } from "@/utils/models"





const Cellule = ({ match }: { match: Match }) => {
    if (!match) {
        return <Typography className="text-black"> EXEMPT </Typography>;
    } else if (!match.home) {
        return (
            <Typography className="text-black">
                Déplacement <br/> {match.teamA}
            </Typography>
        );
    } else if (match.home) {
        return (
            <Box className="flex flex-col">
                <Typography className="text-black">
                    {match.teamA} vs {match.teamB}
                </Typography>
                <Typography className="text-black">
                    {match.date} - {match.time}
                </Typography>
                <Typography className="text-black">{match.gym}</Typography>
            </Box>
        );
    }

    return (
        <TableCell className="flex flex-col justify-center h-full items-center size-fit grow bg-white ">
            {!match.home ? (
                <Typography className="text-green-300"> Deplacement </Typography>
            ) : (
                <>
                    <Typography className="text-primary">
                        {match.teamA} vs {match.teamB}
                    </Typography>
                    <Typography className="text-primary">
                        {match.date} - {match.time}
                    </Typography>
                    <Typography className="text-primary">
                        {match.gym}
                    </Typography>
                </>
            )}
        </TableCell>
    );
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

    const numberOfWeekends = weekends.length

    return (
        <TableContainer component={Paper}>
            <Table className="bg-primary min-w-[500px] ">
                <TableHead>
                    <TableRow className='text-center my-5' >
                        <TableCell className="text-center">{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className="flex">
                        <TableCell className="w-40 max-w-40" />
                        {weekends.map((weekend, index) => (
                            <TableCell key={index}
                                className="flex justify-center items-center grow border-2 border-red-500"
                            >{weekend}</TableCell>
                        ))}
                    </TableRow>
                    {categories.map((category) => (
                        <TableRow key={category} className="flex">
                            <TableCell className="flex justify-center items-center bg-primary w-40 max-w-40" >{category}</TableCell>
                            {weekends.map((weekend, index) => (
                                <TableCell key={index}
                                    style={{ width: `${100 / numberOfWeekends}%` }}
                                    className={`flex flex-col justify-center items-center border-2 border-black grow bg-white `} >
                                    <Cellule key={weekend}
                                        match={matchs.find((match) => weekend.includes(match.day.toString()) && category.includes(match.division)) as Match} />
                                </TableCell>
                            ), matchs)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// { matchs.filter((match) => match.division === category).map((match) => (<Cell match={match} key={match.matchNumber} />)) }
