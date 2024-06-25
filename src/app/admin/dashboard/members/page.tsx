"use client";
import React, { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { members2023, members2024 } from "@/services/dataProcessing";
import categories from "@/data/categories.json";
import { FormControl, InputLabel, MenuItem, Select, Toolbar, Button, Box } from "@mui/material";
import { Member } from "@/models";

// Define the columns for the DataGrid
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 150 },
  { field: "firstName", headerName: "Prenom", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "categorie", headerName: "Categorie", width: 150 },
];

// Define the props for the CatPicker component
interface PickerProps {
  value: string;
  setValue: (value: string) => void;
}

// Category Picker Component
const CatPicker: FC<PickerProps> = ({ value, setValue }) => {
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel className="text-black">Category</InputLabel>
      <Select className="text-black" value={value} onChange={handleCategoryChange} label="Category">
        <MenuItem className="text-black" value="All">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem className="text-black" key={cat.category} value={cat.category}>
            {cat.category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// Year Picker Component
const YearPicker: FC<PickerProps> = ({ value, setValue }) => {
  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel className="text-black">Year</InputLabel>
      <Select className="text-black" value={value} onChange={handleYearChange} label="Year">
        <MenuItem className="text-black" value="2023">2023</MenuItem>
        <MenuItem className="text-black" value="2024">2024</MenuItem>
      </Select>
    </FormControl>
  );
};

// Main Component
const Index: FC = () => {
  const [memberList, setMemberList] = useState<Member[]>(members2023);
  const [category, setCategory] = useState<string>("All");
  const [year, setYear] = useState<string>("2023");
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  useEffect(() => {
    const members = year === "2023" ? members2023 : members2024;
    const filteredMembers = category === "All" ? members : members.filter((member) => member.categorie === category);
    setMemberList(filteredMembers);
  }, [category, year]);

  return (
    <>
      <Toolbar className="flex flex-col">
        <YearPicker value={year} setValue={setYear} />
        <CatPicker value={category} setValue={setCategory} />
      </Toolbar>
      <Button variant="contained" color="primary" onClick={() => console.log(selectionModel)}>
        Send Email
      </Button>
      <Box className="h-fit">
        <DataGrid
          rows={memberList}
          columns={columns}
          getRowId={(row) => row.id}
          className="h-fit"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          checkboxSelection
        />
      </Box>
    </>
  );
};

export default Index;
