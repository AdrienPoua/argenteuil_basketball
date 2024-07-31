"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Toolbar, Button, Box } from "@mui/material";
import { useModal } from "@/utils/contexts/Modal";
import { getMembers } from "@/lib/mongo/controllers/members";
import { DBMemberType } from "@/utils/types";
import { useQuery } from "react-query";
import { DBMemberSchema } from "@/lib/zod";
import { ValidateWithZod } from "@/utils/services/dataProcessing";
import SelectCategory from "./SelectCategory";
import SelectYear from "./SelectYear";
import Modal from "./Modal";


// Define the columns for the DataGrid
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 200 },
  { field: "firstName", headerName: "Prenom", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "categorie", headerName: "Categorie", width: 200 },
];


export default function Index() {
  const [allMembers, setAllMembers] = useState<DBMemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DBMemberType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2023");
  const { setOpen, setContent } = useModal();

  const fetchMembers = async (): Promise<DBMemberType[]> => {
    const members = await getMembers();
    ValidateWithZod(members, DBMemberSchema);
    return members;
  }
  const { data } = useQuery(['members'], fetchMembers);

  useEffect(() => {
    if (data) {
      setAllMembers(data);
      setFilteredMembers(data);
    }
  }, [data]);


  const handleSelectionModelChange = (ids: GridRowSelectionModel) => {
    const selectedMembers = allMembers.filter((member) => ids.find((id) => id === member._id.toString()))
    setContent(<Modal members={selectedMembers} />);
  };

  return (
    <div className='text-black'>
      <Toolbar className="flex flex-col items-center justify-center">
        <SelectCategory setFilteredMembers={setFilteredMembers} allMembers={allMembers} selectedYear={selectedYear} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <SelectYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} allMembers={allMembers} setFilteredMembers={setFilteredMembers} />
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
