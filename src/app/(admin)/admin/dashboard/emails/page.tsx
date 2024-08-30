"use client";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Toolbar, Button, Box } from "@mui/material";
import SelectCategory from "./SelectCategory";
import SelectYear from "./SelectYear";
import { open, setContent } from "@/lib/redux/slices/modal";
import FetchFeedback from '@/components/FetchFeedback';
import { Provider, useValidContext } from "@/utils/contexts/DashboardEmail";
import { ReactElement, useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";


export default function Index() {
  return (
    <Provider>
      <Feedback>
        <Box>
          <Toolbar className="flex flex-col items-center justify-center">
            <SelectCategory />
            <SelectYear />
          </Toolbar>
          <Table />
        </Box>
      </Feedback>
    </Provider>
  );
}


const Feedback = ({ children }: { children: ReactElement }): ReactElement => {
  const { isLoading, error, members } = useValidContext();
  return (
    <FetchFeedback data={members} error={error} isLoading={isLoading}>
      {children}
    </FetchFeedback>
  );
}

const Table = (): ReactElement => {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const { selectedMembers, setSelectedMembers, members, setReset } = useValidContext();
  const dispatch = useDispatch();

  const handleSelectionModelChange = (ids: GridRowSelectionModel) => {
    setRowSelectionModel(ids);
  };

  const handleReset = (): void => {
    setSelectedMembers(members || []);
    setRowSelectionModel([]);
    dispatch(setContent(<Modal members={[]} />));
    setReset((prev: boolean) => !prev);
  };
  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nom", width: 200 },
    { field: "firstName", headerName: "Prenom", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "categorie", headerName: "Categorie", width: 200 },
  ];

  return (
    <Box>
      <Box>
        <Toolbar className="flex flex-row justify-center gap-8">
          <Button
            variant="contained"
            color="primary"
            className="mb-10"
            disabled={rowSelectionModel.length === 0}
            onClick={() => {
              if (members) {
                dispatch(setContent(<Modal members={selectedMembers.filter((member) => rowSelectionModel.includes(member._id.toString()))} />));
                dispatch(open());
              }
            }}
          >
            Send Email
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="mb-10"
            onClick={handleReset}
          >
            ↻
          </Button>
        </Toolbar>
      </Box>
      <Box className="h-fit">
        <DataGrid
          rows={selectedMembers}
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
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
          checkboxSelection
          autoHeight
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </Box>
  );
};
