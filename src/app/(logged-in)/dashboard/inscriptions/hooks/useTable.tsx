import {
  ColumnFiltersState,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { columns } from '../config/tableColumns';
import { Inscription } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  inscriptions: Inscription[];
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  selectedStatus: string;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  setSelectedStatus?: Dispatch<SetStateAction<string>>;
};

export const useTable = ({
  inscriptions,
  sorting,
  columnFilters,
  selectedStatus,
  setSorting,
  setColumnFilters,
}: PropsType) => {
  const table = useReactTable({
    data: inscriptions,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 40,
      },
    },
  });

  return table;
};
