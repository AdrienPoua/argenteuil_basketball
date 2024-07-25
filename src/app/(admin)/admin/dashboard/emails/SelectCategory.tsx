import { InputLabel, MenuItem, Select } from "@mui/material";
import categories from "@/data/categories.json";
import { DBMemberType } from "@/utils/types";


type SelectCategoryProps = {
    allMembers: DBMemberType[];
    setFilteredMembers: (members: DBMemberType[]) => void;
    selectedYear: string;
    setSelectedCategory: (category: string) => void;
    selectedCategory: string;
};

export default function Index({ setFilteredMembers, allMembers, selectedYear, setSelectedCategory, selectedCategory }: Readonly<SelectCategoryProps>) {
    const handleChange = (event: { target: { value: any } }) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredMembers(allMembers.filter((member) => member.year === selectedYear));
        } else {
            setFilteredMembers(allMembers.filter((member) => category.includes(member.categorie) && member.year === selectedYear));
        }
    }
    return (
        <>
            <InputLabel className="text-black">Category</InputLabel>
            <Select
                className="text-black w-full mb-10"
                value={selectedCategory}
                onChange={handleChange}
                label="Category"
            >
                <MenuItem className="text-black" value="All">All</MenuItem>
                {categories.map(({ division }) => (
                    <MenuItem className="text-black" value={division} key={division}>{division}</MenuItem>
                ))}
            </Select>
        </>
    )
}

