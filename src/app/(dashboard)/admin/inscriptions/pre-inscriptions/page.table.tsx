'use client'
import { Cell, flexRender, Header, HeaderGroup } from '@tanstack/react-table'
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm'
import { Button } from '@/components/ui/button'
import { InscriptionEntity } from '@/core/domain/entities/inscription.entity'
import { InscriptionsTableProps } from './page.hooks'

export function Table(props: InscriptionsTableProps) {
  const { table, actions, loadingExtranet } = props

  return (
    <div className="border-t">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<InscriptionEntity>) => (
            <tr key={headerGroup.id} className="border-b text-primary">
              {headerGroup.headers.map((header: Header<InscriptionEntity, unknown>) => (
                <th
                  key={header.id}
                  className={`px-4 py-3 text-left text-sm font-medium ${
                    header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-muted/70' : ''
                  }`}
                  onClick={
                    header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined
                  }
                >
                  <div className="flex items-center">
                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                    {header.column.getIsSorted() === 'asc' && <span className="ml-1">▲</span>}
                    {header.column.getIsSorted() === 'desc' && <span className="ml-1">▼</span>}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b transition-colors hover:bg-primary/50">
              {row.getVisibleCells().map((cell: Cell<InscriptionEntity, unknown>) => {
                const renderedValue = flexRender(cell.column.columnDef.cell, cell.getContext())
                return (
                  <td
                    key={cell.id}
                    className="px-4 py-4 text-sm"
                    title={typeof renderedValue === 'string' ? renderedValue : ''}
                  >
                    {renderedValue}
                  </td>
                )
              })}
              <td className="px-4 py-4">
                <div className="flex flex-nowrap justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => actions.extranet(row.original)}
                    disabled={loadingExtranet === row.original.id}
                    className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {loadingExtranet === row.original.id ? '⏳' : '🌐'} Extranet
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => actions.edit(row.original)}>
                    Modifier
                  </Button>
                  <AlertDialogConfirm
                    title="Êtes-vous sûr de vouloir supprimer cette pré-inscription ?"
                    description="Cette action est irréversible."
                    onConfirm={() => actions.delete(row.original.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
