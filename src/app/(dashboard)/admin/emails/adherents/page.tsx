'use client'
import { useEffect, useState } from 'react'
import { Loading } from '@/components/ui/loading'
import { Adherent } from '@/core/infrastructure/extranet/client'
import { getAdherents } from '@/core/presentation/actions/adherents/getAdherents'
import { AdherentsTable } from './page.table'

export default function Page() {
  const [adherents, setAdherents] = useState<Adherent[]>([])

  useEffect(() => {
    const getData = async () => {
      const adherents = await getAdherents()
      setAdherents(adherents)
    }
    getData()
  }, [])

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestion des Adhérents</h1>
        <p className="text-muted-foreground">
          Gérez les adhérents du club et copiez les adresses emails par catégorie
        </p>
      </div>
      <AdherentsTable adherents={adherents} />
    </div>
  )
}
