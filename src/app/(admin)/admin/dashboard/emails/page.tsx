"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Toolbar, Button, Box } from "@mui/material";
import { getMembers } from "@/lib/mongo/controllers/members";
import { DBMemberType } from "@/utils/types";
import { useQuery } from "react-query";
import { DBMemberSchema } from "@/lib/zod/schemas";
import { ValidateWithZod } from "@/lib/zod/utils/index"
import SelectCategory from "./SelectCategory";
import SelectYear from "./SelectYear";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { open, setContent } from "@/lib/redux/slices/modal";

// Define the columns for the DataGrid
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 200 },
  { field: "firstName", headerName: "Prenom", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "categorie", headerName: "Categorie", width: 200 },
];


export default function Index() {
  const dispatch = useDispatch();
  const [allMembers, setAllMembers] = useState<DBMemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<DBMemberType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2023");
  const props = {
    SelectCategory: {
      selectedCategory,
      setSelectedCategory,
      allMembers,
      selectedYear,
      setFilteredMembers
    },
    SelectYear: {
      selectedYear,
      setSelectedYear,
      allMembers,
      setFilteredMembers
    }
  }
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
        <SelectCategory {...props.SelectCategory} />
        <SelectYear {...props.SelectYear} />
        <Button
          variant="contained"
          color="primary"
          className="mb-10"
          onClick={() => dispatch(open())}
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
