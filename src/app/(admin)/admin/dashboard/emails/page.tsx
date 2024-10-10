"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button"; // Button from ShadCN UI
import SelectCategory from "./SelectCategory";
import SelectYear from "./SelectYear";
import { open, setContent } from "@/lib/redux/slices/modal";
import FetchFeedback from "@/components/FetchFeedback";
import { Provider, useValidContext } from "@/utils/contexts/DashboardEmail";
import Modal from "./Modal";
import { useDispatch } from "react-redux";

// Index component with Provider and Feedback
export default function Index() {
  return (
    <Provider>
      <Feedback>
        <div className="flex flex-col items-center justify-center gap-10">
          <SelectCategory />
          <SelectYear />
          <Table />
        </div>
      </Feedback>
    </Provider>
  );
}

// Feedback component handling loading, error and data states
const Feedback = ({ children }: { children: ReactElement }): ReactElement => {
  const { isLoading, error, members } = useValidContext();
  return (
    <FetchFeedback data={members} error={error} isLoading={isLoading}>
      {children}
    </FetchFeedback>
  );
};

// Table component handling selection and actions
const Table = (): ReactElement => {
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const { selectedMembers, setSelectedMembers, members, setReset } = useValidContext();
  const dispatch = useDispatch();

  const handleSelectionModelChange = (selectedIds: string[]) => {
    setRowSelectionModel(selectedIds);
  };

  const handleReset = (): void => {
    setSelectedMembers(members || []);
    setRowSelectionModel([]);
    dispatch(setContent(<Modal members={[]} />));
    setReset((prev: boolean) => !prev);
  };

  // Table columns definition (same fields)
  const columns = [
    { header: "Nom", field: "name", width: 200 },
    { header: "Prenom", field: "firstName", width: 200 },
    { header: "Email", field: "email", width: 200 },
    { header: "Categorie", field: "categorie", width: 200 },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-10">
        <Button
          disabled={rowSelectionModel.length === 0}
          onClick={() => {
            if (members) {
              dispatch(
                setContent(
                  <Modal
                    members={selectedMembers.filter((member) =>
                      rowSelectionModel.includes(member._id.toString())
                    )}
                  />
                )
              );
              dispatch(open());
            }
          }}
        >
          Send Email
        </Button>
        <Button onClick={handleReset}>↻</Button>
      </div>

      {/* DataGrid-like Table */}
      <div className="overflow-auto w-full max-w-4xl">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? setRowSelectionModel(selectedMembers.map((m) => m._id.toString()))
                      : setRowSelectionModel([])
                  }
                  checked={rowSelectionModel.length === selectedMembers.length}
                />
              </th>
              {columns.map((col) => (
                <th key={col.field} className="border border-gray-300 p-2">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedMembers.map((row) => (
              <tr
                key={row._id}
                className={`border border-gray-300 ${rowSelectionModel.includes(row._id.toString())
                  ? "bg-primary text-white"
                  : ""
                  }`}
              >
                <td className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    checked={rowSelectionModel.includes(row._id.toString())}
                    onChange={(e) =>
                      setRowSelectionModel((prev) =>
                        e.target.checked
                          ? [...prev, row._id.toString()]
                          : prev.filter((id) => id !== row._id.toString())
                      )
                    }
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.field} className="border border-gray-300 p-2">
                    {row[col.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
