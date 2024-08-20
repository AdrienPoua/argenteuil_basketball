import React, { ReactElement } from 'react'
import { Container, Typography } from '@mui/material'

type PropsType = {
    children: React.ReactNode;
};
export default function Index({ children }: Readonly<PropsType>): ReactElement {
    return (
        <Container
            className="bg-[url('/images/background.jpg')] flex justify-center items-center mb-10 max-w-[80%] py-5"
        >
            <Typography
                component="h1"
                className="whitespace-nowrap  text-5xl text-center text-white"
            >
                {children}
            </Typography>
        </Container>
    )
}
