import { ColumnFiltersState } from '@tanstack/react-table';

export const handleStatusFilterChange = (
  value: string,
  setSelectedStatus: (value: string) => void,
  setColumnFilters: (value: ColumnFiltersState) => void,
  columnFilters: ColumnFiltersState,
) => {
  setSelectedStatus(value);
  if (value === 'all') {
    setColumnFilters(columnFilters.filter((filter) => filter.id !== 'statut'));
  } else {
    setColumnFilters([...columnFilters.filter((filter) => filter.id !== 'statut'), { id: 'statut', value }]);
  }
};
