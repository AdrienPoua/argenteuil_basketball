import { handleStatusFilterChange } from './handleStatusFilterChange';

import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Inscription } from '@prisma/client';
import { ColumnFiltersState, Table } from '@tanstack/react-table';

type PropsType = {
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  setColumnFilters: (value: ColumnFiltersState) => void;
  columnFilters: ColumnFiltersState;
  table: Table<Inscription>;
};

export function StatusFilter({
  selectedStatus,
  setSelectedStatus,
  setColumnFilters,
  columnFilters,
  table,
}: Readonly<PropsType>) {
  return (
    <div className='mb-4 flex items-center space-x-4'>
      <div className='flex items-center space-x-2'>
        <label htmlFor='status-filter' className='text-sm font-medium'>
          Filtrer par statut :
        </label>
        <Select
          value={selectedStatus}
          onValueChange={(value) => handleStatusFilterChange(value, setSelectedStatus, setColumnFilters, columnFilters)}
        >
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Tous les statuts' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tous les statuts</SelectItem>
            <SelectItem value='EN_ATTENTE'>En attente</SelectItem>
            <SelectItem value='TRAITEE'>Traitée</SelectItem>
            <SelectItem value='REJETEE'>Rejetée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='ml-auto text-sm text-muted-foreground'>
        {table.getFilteredRowModel().rows.length} inscription(s) trouvée(s)
      </div>
    </div>
  );
}
