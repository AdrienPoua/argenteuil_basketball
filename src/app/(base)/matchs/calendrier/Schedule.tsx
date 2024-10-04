import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"; // Shadcn UI Table components
import { Match } from "@/utils/models";
import Cell from "./Cell"; // Import your custom Cell component
import { ReactElement } from "react";
import Underline from "@/components/Underline";

type PropsType = {
    matchs: Match[];
    title: string;
};

export default function Schedule({ matchs, title }: Readonly<PropsType>): ReactElement {
    const categories = Match.getCategories(matchs);
    const weekends = Match.getWeekends(matchs);

    return (
        <div className="flex flex-col gap-10 w-full">
            <h2 className="text-center relative text-5xl font-semibold">
                {title}
                <Underline />
            </h2>

            <div className="bg-white shadow-md rounded-lg">
                <Table>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category} className="flex">
                                <TableCell className="shrink-0 flex justify-center items-center min-w-[80px] text-background bg-primary">
                                    {category}
                                </TableCell>
                                {weekends.map((weekend) => (
                                    <Cell
                                        key={`${weekend}-${category}`}
                                        match={matchs.find((match) => weekend.includes(match.day.toString()) && category.includes(match.division)) as Match}
                                    />
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
