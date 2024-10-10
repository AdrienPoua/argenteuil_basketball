'use client'

import React, { useState } from 'react'
import { Match } from '@/utils/models'

type PropsType = {
  matchs: Match[]
  setSelectedMatch: (matchs: Match[]) => void
}

export default function Index({ matchs, setSelectedMatch }: Readonly<PropsType>) {
  const [selected, setSelected] = useState<Match[]>([])

  const handleChange = (selectedMatches: Match[]) => {
    setSelected(selectedMatches)
    setSelectedMatch(selectedMatches)
  }

  return (
    <div className="w-[80%] m-auto mb-5">
    </div>
  )
}
