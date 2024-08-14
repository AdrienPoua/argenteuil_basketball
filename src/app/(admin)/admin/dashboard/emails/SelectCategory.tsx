import { InputLabel, MenuItem, Select } from "@mui/material";
import categories from "@/data/categories.json";
import { useValidContext } from "@/utils/contexts/DashboardEmail";
import { useState, useEffect } from "react";

export default function Index() {
    const { setSelectedMembers, filterByCategory, reset } = useValidContext();
    useEffect(() => {
        setValue("All");
    }, [reset]);
    const [value, setValue] = useState("All");
    const handleChange = ({ target: { value } }: { target: { value: string } }) => {
        setSelectedMembers(filterByCategory(value));
        setValue(value);
    };
    return (
        <>
            <InputLabel className="text-black">Categorie</InputLabel>
            <Select
                className="text-black w-full mb-10"
                onChange={handleChange}
                label="Categorie"
                value={value}
            >
                <MenuItem className="text-black" value="All">All</MenuItem>
                {categories.map(({ division }) => (
                    <MenuItem className="text-black" value={division} key={division}>{division}</MenuItem>
                ))}
            </Select>
        </>
    )
}

