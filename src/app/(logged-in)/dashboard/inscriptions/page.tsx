'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';
import { columns } from './config/tableColumns';
import { useHooks } from './hooks';
import { useTable } from './hooks/useTable';
import { StatusFilter } from './config/statusFilter';

export default function InscriptionsPage() {
  // Récupération des données avec react-query et des etats
  const {
    columnFilters,
    selectedStatus,
    setColumnFilters,
    setSelectedStatus,
    inscriptions,
    isLoading,
    isError,
    sorting,
    setSorting,
  } = useHooks();
  // Configuration de TanStack Table
  const table = useTable({
    inscriptions,
    columnFilters,
    selectedStatus,
    setColumnFilters,
    setSelectedStatus,
    sorting,
    setSorting,
  });

  if (isError) {
    return (
      <div className='container mx-auto py-8 text-center'>
        <div className='rounded-md bg-red-50 p-4'>
          <h2 className='mb-2 text-lg font-semibold text-red-800'>Erreur de chargement</h2>
          <p className='text-red-700'>
            Une erreur est survenue lors du chargement des inscriptions. Veuillez réessayer.
          </p>
          <Button onClick={() => window.location.reload()} variant='outline' className='mt-4'>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoading && inscriptions.length === 0) {
    return (
      <div className='container mx-auto py-8 text-center'>
        <p className='text-gray-500'>Aucune inscription trouvée</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8 font-secondary text-foreground'>
      <div className='mb-8'>
        <h1 className='mb-4 text-3xl font-bold'>Inscriptions en ligne</h1>
        {/* Filtres */}
        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          setColumnFilters={setColumnFilters}
          columnFilters={columnFilters}
          table={table}
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='font-secondary text-foreground'>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='font-secondary text-foreground'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='py-8 text-center'>
                  <div className='flex items-center justify-center'>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Chargement...
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Affichage de {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} à{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{' '}
          sur {table.getFilteredRowModel().rows.length} inscription(s)
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <div className='flex items-center gap-1'>
            <span className='text-sm font-medium'>Page</span>
            <span className='text-sm font-medium'>
              {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
            </span>
          </div>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
