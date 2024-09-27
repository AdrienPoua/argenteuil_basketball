import { Table, TableCell, TableRow, TableBody, TableContainer, Paper, Box, Typography } from '@mui/material'
import { Match } from '@/utils/models'
import Cell from './Cell'
import { ReactElement } from 'react'

type PropsType = {
    matchs: Match[]
    title: string
}

export default function Schedule({ matchs, title }: Readonly<PropsType>): ReactElement {
    const categories = Match.getCategories(matchs)
    const weekends = Match.getWeekends(matchs)
    return (
        <Box className="flex flex-col gap-10 w-full">
            <Typography variant="h2" className="text-center relative ">
                {title}
                <Box
            className="after:bg-gradient-to-r from-primary to-white after:p-1 after:shadow-xl after:w-full after:rounded-lg after:filter after:absolute after:left-0 inline-block"
            sx={{ "::after": { bottom: '-10px' } }}
        />
            </Typography>
            <TableContainer component={Paper}>
                <Table className="bg-primary">
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category} className="flex">
                                <TableCell className="shrink-1 flex justify-center items-center min-w-20"> {category}</TableCell>
                                {weekends.map((weekend, index) => (
                                    <Cell
                                        key={weekend + category}
                                        match={matchs.find((match) => weekend.includes(match.day.toString()) && category.includes(match.division)) as Match} />
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
