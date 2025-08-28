'use client'
import { Cell, flexRender, Header, HeaderGroup } from '@tanstack/react-table'
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm'
import { Button } from '@/components/ui/button'
import { InscriptionEntity } from '@/core/domain/entities/inscription.entity'
import { InscriptionsTableProps } from './page.hooks'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

export function Table(props: Readonly<InscriptionsTableProps>) {
  const { table, actions, loadingExtranet } = props

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copié dans le presse-papier`)
    } catch (error) {
      toast.error('Erreur lors de la copie')
    }
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<InscriptionEntity>) => (
          <tr key={headerGroup.id} className="border-b text-primary">
            {headerGroup.headers.map((header: Header<InscriptionEntity, unknown>) => (
              <th
                key={header.id}
                className={`px-4 py-3 text-left text-sm font-medium ${
                  header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-primary/20' : ''
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
              const columnId = cell.column.id
              const shouldShowCopyButton = [
                'lastName',
                'firstName',
                'dateOfBirth',
                'email',
              ].includes(columnId)

              let copyValue = ''
              let copyLabel = ''

              if (shouldShowCopyButton) {
                switch (columnId) {
                  case 'lastName':
                    copyValue = row.original.lastName
                    copyLabel = 'Nom'
                    break
                  case 'firstName':
                    copyValue = row.original.firstName
                    copyLabel = 'Prénom'
                    break
                  case 'dateOfBirth':
                    copyValue = row.original.dateOfBirth
                      ? new Date(row.original.dateOfBirth).toLocaleDateString()
                      : ''
                    copyLabel = 'Date de naissance'
                    break
                  case 'email':
                    copyValue = row.original.email
                    copyLabel = 'Email'
                    break
                }
              }

              return (
                <td
                  key={cell.id}
                  className="px-4 py-4 text-sm"
                  title={typeof renderedValue === 'string' ? renderedValue : ''}
                >
                  <div className="flex items-center gap-2">
                    <span>{renderedValue}</span>
                    {shouldShowCopyButton && copyValue && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        onClick={() => copyToClipboard(copyValue, copyLabel)}
                        title={`Copier ${copyLabel.toLowerCase()}`}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </td>
              )
            })}
            <td className="px-4 py-4">
              <div className="flex flex-nowrap justify-end gap-2">
                {process.env.NODE_ENV !== 'production' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => actions.extranet(row.original)}
                    disabled={loadingExtranet === row.original.id}
                    className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {loadingExtranet === row.original.id ? '⏳' : '🌐'} Extranet
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-500 hover:bg-green-400 hover:text-white"
                  onClick={() => actions.done(row.original.id)}
                >
                  Done
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
  )
}
