import { useState, useEffect } from "react";
import { useValidContext } from "@/utils/contexts/DashboardEmail";
import { Label } from "@/components/ui/label"; // ShadCN UI Label
import { Select, SelectItem, SelectContent } from "@/components/ui/select"; // ShadCN UI Select and SelectItem

export default function Index() {
  const { setSelectedMembers, filterByYear, setFilteredByYearMembers, reset, year, setYear } = useValidContext();

  const handleChange = (value: string) => {
    const filteredMembers = filterByYear(value);
    setSelectedMembers(filteredMembers);
    setFilteredByYearMembers(filteredMembers);
    setYear(value);
  };

  // Reset year to 2024 when reset is triggered
  useEffect(() => {
    setYear("2024");
  }, [reset, setYear]);

  return (
    <>
      {/* Year Label */}
      <Label className="text-black">Year</Label>

      {/* Year Select Dropdown */}

      <Select value={year} onValueChange={handleChange} >
        <SelectContent>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
