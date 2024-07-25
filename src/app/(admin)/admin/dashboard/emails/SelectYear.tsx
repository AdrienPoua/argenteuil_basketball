import { InputLabel, MenuItem, Select } from "@mui/material";
import { DBMemberType } from "@/utils/types";

type SelectYearProps = {
    setSelectedYear: (year: string) => void;
    setFilteredMembers: (members: DBMemberType[]) => void;
    allMembers: DBMemberType[];
    selectedYear: string;
}

export default function Index({ setSelectedYear, selectedYear, setFilteredMembers, allMembers }: Readonly<SelectYearProps>) {
    const handleChange = (event: { target: { value: any } }) => {
        const year = event.target.value;
        setSelectedYear(year);
        setFilteredMembers(allMembers.filter((member) => member.year === year));
    };
    return (
        <>
            <InputLabel className="text-black">Year</InputLabel>
            <Select
                className="text-black w-full mb-10"
                value={selectedYear}
                onChange={handleChange}
                label="Year"
            >
                <MenuItem className="text-black" value="2023">2023</MenuItem>
                <MenuItem className="text-black" value="2024">2024</MenuItem>
            </Select>
        </>
    )
}

