import React from 'react'
import { Container, Typography } from '@mui/material'

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Container
            className="bg-[url('/images/background.jpg')] flex justify-center items-center mb-10 max-w-[80%] py-5"
        >
            <Typography
                variant="h1"
                className="whitespace-nowrap  text-lg md:text-2xl xl:text-5xl text-center text-white"
            >
                {children}
            </Typography>
        </Container>
    )
}
