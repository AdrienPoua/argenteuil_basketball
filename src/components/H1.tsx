import React from 'react'
import { Container, Typography } from '@mui/material'

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Container
            className="bg-[url('/images/background.jpg')] flex justify-center items-center mb-10"
        >
            <Typography
                variant="h1"
                className="whitespace-nowrap"
            >
                {children}
            </Typography>
        </Container>
    )
}
