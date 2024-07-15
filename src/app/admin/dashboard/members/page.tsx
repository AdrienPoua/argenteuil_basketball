"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Toolbar, Button, Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useOverlay } from "@/contexts/Overlay";
import { EmailMemberContent } from "@/components/Overlay";
import categories from "@/data/categories.json";
import { getMembers } from "@/lib/mongo/controllers/members";
import { DBMemberType } from "@/lib/mongo/models/Member";
import { useQuery } from "react-query";


// Define the columns for the DataGrid
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 200 },
  { field: "firstName", headerName: "Prenom", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "categorie", headerName: "Categorie", width: 200 },
];


// Main Component
export default function Index() {
  const [allMembers, setAllMembers] = useState<DBMemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DBMemberType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2023");
  const { setOpen, setContent } = useOverlay();

  const fetchMembers = async () => {
    return await getMembers();
  };

  const { data } = useQuery(['members'], fetchMembers);

  useEffect(() => {
    if (data) {
      setAllMembers(data);
      setFilteredMembers(data);
    }
  }, [data]);

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredMembers(allMembers.filter((member) => member.year === selectedYear));
    } else {
      setFilteredMembers(allMembers.filter((member) => category.includes(member.categorie) && member.year === selectedYear ));
    }
  };

  const handleYearChange = (event: { target: { value: any } }) => {
    const year = event.target.value;
    setSelectedYear(year);
    setFilteredMembers(allMembers.filter((member) => member.year === year));
  };

  const handleSelectionModelChange = (ids: GridRowSelectionModel) => {
    const selectedMembers = allMembers.filter((member) => ids.find((id) => id === member._id.toString()))
    setContent(<EmailMemberContent members={selectedMembers} />);
  };

  return (
    <div className='text-black'>
      <Toolbar className="flex flex-col items-center justify-center">
        <InputLabel className="text-black">Category</InputLabel>
        <Select
          className="text-black w-full mb-10"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem className="text-black" value="All">All</MenuItem>
          {categories.map(({ division }) => (
            <MenuItem className="text-black" value={division} key={division}>{division}</MenuItem>
          ))}
        </Select>
        <InputLabel className="text-black">Year</InputLabel>
        <Select
          className="text-black w-full mb-10"
          value={selectedYear}
          onChange={handleYearChange}
          label="Year"
        >
          <MenuItem className="text-black" value="2023">2023</MenuItem>
          <MenuItem className="text-black" value="2024">2024</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          className="mb-10"
          onClick={() => setOpen(true)}
        >
          Send Email
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="mb-10"
          onClick={() => setFilteredMembers(allMembers)}
        >
          ↻
        </Button>
      </Toolbar>
      <Box className="h-fit">
        <DataGrid
          rows={filteredMembers}
          columns={columns}
          getRowId={(row) => row._id}
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
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
          checkboxSelection
          autoHeight
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </div>
  );
};
