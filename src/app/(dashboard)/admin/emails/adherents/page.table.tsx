'use client'

import { Copy, Filter, Mail } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Adherent = {
  id: number
  numeroLicence: string
  nom: string
  prenom: string
  sexe: string
  dateNaissance: string
  email: string
  categorie: string
  typeLicence: string
  dateQualification: string | null
  nomOrganisme: string
}

interface AdherentsTableProps {
  adherents: Adherent[]
}

export function AdherentsTable({ adherents }: Readonly<AdherentsTableProps>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(adherents.map((adherent) => adherent.categorie)))
    const sortedCategories = uniqueCategories.toSorted((a, b) =>
      a.localeCompare(b, 'fr-FR', {
        sensitivity: 'base',
        numeric: true,
        ignorePunctuation: true,
      }),
    )
    return sortedCategories
  }, [adherents])

  // Filter adherents
  const filteredAdherents = useMemo(() => {
    return adherents.filter((adherent) => {
      const matchesSearch =
        adherent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adherent.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adherent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adherent.numeroLicence.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'all' || adherent.categorie === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [adherents, searchTerm, selectedCategory])

  // Get emails of filtered adherents
  const filteredEmails = useMemo(() => {
    return filteredAdherents
      .map((adherent) => adherent.email)
      .filter((email) => email && email.trim() !== '')
  }, [filteredAdherents])

  const handleCopyEmails = async () => {
    if (filteredEmails.length === 0) {
      toast.error('Aucune adresse email à copier')
      return
    }

    try {
      await navigator.clipboard.writeText(filteredEmails.join('; '))
      toast.success(`${filteredEmails.length} adresses email copiées dans le presse-papiers`)
    } catch (error) {
      toast.error('Erreur lors de la copie des emails')
      console.error('Failed to copy emails:', error)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      U7: 'bg-blue-100 text-blue-800',
      U9: 'bg-green-100 text-green-800',
      U11: 'bg-yellow-100 text-yellow-800',
      U13: 'bg-orange-100 text-orange-800',
      U15: 'bg-red-100 text-red-800',
      U18: 'bg-purple-100 text-purple-800',
      U20: 'bg-pink-100 text-pink-800',
      Seniors: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || 'bg-slate-100 text-slate-800'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Adhérents ({filteredAdherents.length})
          </CardTitle>

          <Button
            onClick={handleCopyEmails}
            className="flex items-center gap-2"
            disabled={filteredEmails.length === 0}
          >
            <Copy className="h-4 w-4" />
            Copier les emails ({filteredEmails.length})
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom, prénom, email ou numéro de licence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow>
                <TableHead>Nom & Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Licence</TableHead>
                <TableHead>Date de naissance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdherents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    Aucun adhérent trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdherents.map((adherent) => (
                  <TableRow key={adherent.id}>
                    <TableCell className="font-medium">
                      {adherent.nom} {adherent.prenom}
                      <div className="text-sm text-muted-foreground">{adherent.sexe}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{adherent.email || 'Non renseigné'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getCategoryColor(adherent.categorie)} border-0`}>
                        {adherent.categorie}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {adherent.numeroLicence}
                      <div className="text-xs text-muted-foreground">{adherent.typeLicence}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(adherent.dateNaissance).toLocaleDateString('fr-FR')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        {filteredAdherents.length > 0 && (
          <div className="mt-4 rounded-lg bg-muted/50 p-4">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Total: {filteredAdherents.length} adhérents</span>
              <span>Emails valides: {filteredEmails.length}</span>
              {selectedCategory !== 'all' && <span>Catégorie: {selectedCategory}</span>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
