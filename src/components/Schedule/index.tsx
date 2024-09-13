import { Table, TableCell, TableHead, TableRow, TableBody, TableContainer, Paper } from '@mui/material'
import { Match } from "@/utils/models"
import Cell from './Cell'
import { ReactElement } from 'react'

type PropsType = {
    matchs: Match[]
    title: string
}

export default function Schedule({ matchs, title }: Readonly<PropsType>): ReactElement {
    const categories = Match.getCategories(matchs)
    const weekends = Match.getWeekends(matchs)
    const width = "max-w-40 min-w-40 flex justify-center items-center"
    return (
        <TableContainer component={Paper} className="grow">
            <Table className="bg-primary ">
                <TableHead>
                    <TableRow className='text-center my-5' >
                        <TableCell className="text-center text-6xl text-white py-10">{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category} className="flex">
                            <TableCell className={width}> {category}</TableCell>
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
    );
}
