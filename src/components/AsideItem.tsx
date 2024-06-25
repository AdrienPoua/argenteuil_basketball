import React from 'react'
import { Box, Typography, Link } from '@mui/material'

export default function AsideItem({logo, title, href}: Readonly<{ title: string, href: string, logo : string}>) {
  return (
    <Box className="w-full h-28 flex justify-center items-center bg-gray-500 hover:bg-gray-300 ">
        <Link href={href} className="w-full flex justify-center items-center">
            {logo}
            <Typography className="text-center ms-5">{title}</Typography>
        </Link>
    </Box>
  )
}
