import React from 'react'
import { Button, Typography, Link } from '@mui/material'

export default function AsideItem({ logo, title, href }: Readonly<{ title: string, href: string, logo: string }>) {
  return (
    <Button className="w-full h-20" variant="contained">
      <Link href={href} className="w-full flex justify-center items-center">
        {logo}
        <Typography className="text-center ms-5">{title}</Typography>
      </Link>
    </Button>
  )
}
