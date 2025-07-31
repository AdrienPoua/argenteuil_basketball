'use client'

import { Clock, MapPin, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  allSessionsType,
  gymnaseMapType,
  GymnaseType,
  sessionsByDayAndTimeType,
  TeamType,
} from './page'

type PropsType = {
  teams: TeamType[]
  gymnases: GymnaseType[]
  sessionsByDayAndTime: sessionsByDayAndTimeType
  allSessions: allSessionsType
  gymnaseMap: gymnaseMapType
}

export default function SessionsTableView({ allSessions, gymnaseMap }: Readonly<PropsType>) {
  // Créer un map des gymnases pour un accès facile

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Users className="h-5 w-5" />
          Planning des Entraînements - Vue Tableau
        </CardTitle>
        <CardDescription>
          Toutes les sessions d&apos;entraînement du club organisées par jour et horaire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jour</TableHead>
              <TableHead>Horaires</TableHead>
              <TableHead>Équipe</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead>Gymnase</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.day}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {session.start} - {session.end}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{session.team}</TableCell>
                <TableCell>
                  <Badge className={`text-white`}>{session.category.join(', ')}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{session.level}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {gymnaseMap[session.gymnase_id] ?? 'Gymnase inconnu'}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
