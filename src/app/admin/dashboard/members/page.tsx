"use client";
import { useState, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { members } from "@/services/dataProcessing";
import { Toolbar, Button, Box, InputLabel, MenuItem, Select } from "@mui/material";
import { Member } from "@/models";
import { v4 as uuidv4 } from "uuid";
import { useOverlay } from "@/contexts/Overlay";
import { EmailMemberContent } from "@/components/Overlay"
import cat from "@/data/cat.json";

// Define the columns for the DataGrid
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 200 },
  { field: "firstName", headerName: "Prenom", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "categorie", headerName: "Categorie", width: 200 },
];

// Main Component
const Index: FC = () => {
  const [membersList, setMembersList] = useState<Member[]>(members);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedRows, setSelectedRows] = useState<Member[]>([]);

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const categorie = event.target.value;
    setSelectedCategory(categorie);
    if (categorie === "All") {
      setMembersList(members.filter((member) => member.year === selectedYear));
    } else {
      setMembersList(members.filter((member) => member.categorie == categorie && member.year === selectedYear));
    }
  };

  const handleYearChange = (event: { target: { value: any } }) => {
    const year = event.target.value;
    setSelectedYear(year);
    setMembersList(members.filter((member) => member.year === year));
  };

  const handleSelectionModelChange = (selection: Iterable<unknown> | null | undefined) => {
    if (selection && Array.isArray(selection)) {
      const selectedIDs = new Set(selection);
      const selectedData = membersList.filter((member) => selectedIDs.has(member.id));
      setContent(<EmailMemberContent members={selectedData} setOpen={setOpen} />);
    } else {
      setSelectedRows([]);
    }
  };

  const { open, setOpen, content, setContent } = useOverlay();

  return (
    <>
      <Toolbar className="flex flex-col items-center justify-center">
        <InputLabel className="text-black">Category</InputLabel>
        <Select
          className="text-black w-full"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category">
          <MenuItem
            className="text-black"
            value="All">
            All
          </MenuItem>
          {cat.map(({ category }) => (
            <MenuItem
              className="text-black"
              value={category}
              key={uuidv4()}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <InputLabel className="text-black">Year</InputLabel>
        <Select
          className="text-black  w-full"
          value={selectedYear}
          onChange={handleYearChange}
          label="Year">
          <MenuItem
            className="text-black"
            value="2023">
            2023
          </MenuItem>
          <MenuItem
            className="text-black"
            value="2024">
            2024
          </MenuItem>
        </Select>
      </Toolbar>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}>
        Send Email
      </Button>
      <Box className="h-fit">
        <DataGrid
          rows={membersList}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f56",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "#4754A1 ",
              color: "white !important",
            },
          }}
          checkboxSelection
          autoHeight
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </>
  );
};

export default Index;
