import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"; // Shadcn UI Table components
import { Match } from "@/utils/models";
import Cell from "./Cell"; // Import your custom Cell component
import { ReactElement } from "react";

type PropsType = {
    matchs: Match[];
    title: string;
};

export default function Schedule({ matchs, title }: Readonly<PropsType>): ReactElement {
    const categories = Match.getCategories(matchs);
    const weekends = Match.getWeekends(matchs);

    return (
        <div className="flex flex-col gap-10 w-full">
            <h2 className="text-center relative text-3xl font-semibold">
                {title}
                <span className="block w-full h-1 mt-2 bg-gradient-to-r from-primary to-white shadow-xl rounded-lg" />
            </h2>

            <div className="bg-white shadow-md rounded-lg">
                <Table>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category} className="flex">
                                <TableCell className="shrink-0 flex justify-center items-center min-w-[80px] font-semibold">
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
