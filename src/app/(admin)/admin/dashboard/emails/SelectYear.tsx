import { InputLabel, MenuItem, Select } from "@mui/material";
import { useValidContext } from "@/utils/contexts/DashboardEmail";
import { useState, useEffect } from "react";

export default function Index() {
    const { setSelectedMembers, filterByYear, setFilteredByYearMembers, reset, year, setYear } = useValidContext();

    const handleChange = ({ target: { value } }: { target: { value: string } }) => {
        const filteredMembers = filterByYear(value);
        setSelectedMembers(filteredMembers);
        setFilteredByYearMembers(filteredMembers);
        setYear(value);
    };

    useEffect(() => {
        setYear("2024");
    }, [reset, setYear]);

    return (
        <>
            <InputLabel className="text-black">Year</InputLabel>
            <Select
                className="text-black w-full mb-10"
                onChange={handleChange}
                value={year}
                label="Year"
            >
                <MenuItem className="text-black" value="2024">2024</MenuItem>
                <MenuItem className="text-black" value="2023">2023</MenuItem>
            </Select>
        </>
    )
}

