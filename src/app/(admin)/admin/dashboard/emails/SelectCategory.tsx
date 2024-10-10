import { useState, useEffect } from "react";
import categories from "@/data/categories.json";
import { useValidContext } from "@/utils/contexts/DashboardEmail";
import { Label } from "@/components/ui/label"; // ShadCN UI label
import { Select, SelectItem, SelectContent } from "@/components/ui/select"; // ShadCN UI Select and SelectItem

export default function Index() {
  const { setSelectedMembers, filterByCategory, reset, year } = useValidContext();
  const [value, setValue] = useState("All");

  // Reset category selection when reset or year changes
  useEffect(() => {
    setValue("All");
  }, [reset, year]);

  const handleChange = (value: string) => {
    setSelectedMembers(filterByCategory(value));
    setValue(value);
  };
  return (
    <>
      <Label className="text-black">Category</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {categories.map(({ division }) => (
            <SelectItem value={division} key={division}>
              {division}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
