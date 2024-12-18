import React, { useRef, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { TCompetition } from './utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CompetitionClassementTabsProps {
  competitions: TCompetition[]
}

export default function CompetitionClassementTabs({ competitions }: Readonly<CompetitionClassementTabsProps>) {
  const tabsListRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const tabsList = tabsListRef.current
    if (tabsList) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        tabsList.scrollLeft += e.deltaY
      }
      tabsList.addEventListener('wheel', handleWheel)
      return () => tabsList.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const tabsList = tabsListRef.current
    if (tabsList) {
      const scrollAmount = tabsList.clientWidth / 2
      tabsList.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  return (
      <Tabs defaultValue={competitions[0]?.code} className="w-full">
        <div className="relative md:w-fit md:mx-auto">
          <Button
            onClick={() => scroll('left')}
            className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 shadow-md rounded-full z-10"
            aria-label="Scroll left"
            variant={"ghost"}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <TabsList
            ref={tabsListRef}
            className="flex overflow-x-auto bg-transparent border-2 border-primary"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {competitions.map((competition) => (
              <TabsTrigger
                key={competition.id}
                value={competition.code}
                className="flex-shrink-0 text-white"
              >
                {competition.code.split('-')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            onClick={() => scroll('right')}
            variant={"ghost"}
            className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 shadow-md rounded-full z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {competitions.map((competition) => (
          <TabsContent key={competition.id} value={competition.code}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Position</TableHead>
                    <TableHead>Équipe</TableHead>
                    <TableHead>Pts</TableHead>
                    <TableHead>J</TableHead>
                    <TableHead>G</TableHead>
                    <TableHead>N</TableHead>
                    <TableHead>P</TableHead>
                    <TableHead>Diff</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competition.classements && competition.classements.length > 0 ? (
                    competition.classements.map((classement) => {
                      const isArgenteuil = classement.organisme.code === "IDF0095019";
                      return (
                        <TableRow key={classement.organisme.id} className={classement.organisme.libelle.toLowerCase() === "exempt" ? "hidden" : ""}>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.position}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.organisme.libelle}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.points}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.matchJoues}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.gagnes}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.nuls}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.perdus}</TableCell>
                          <TableCell className={isArgenteuil ? "bg-primary" : ""}>{classement.difference}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">Aucun classement disponible</TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={8} className="text-center font-medium">
                      {competition.nom}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
  );
}

