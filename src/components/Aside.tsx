import { Box } from '@mui/material'
import React from 'react'

export default function Aside({ children} : Readonly<{children: React.ReactNode}>) {
  return (
    <Box className="w-1/6 bg-primary-light flex flex-col" component="aside" >
        {children}
    </Box>
  )
}
