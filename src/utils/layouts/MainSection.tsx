"use client";
import React from "react";
import Container from "@mui/material/Container";

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Container
            component="main">
            {children}
        </Container>
    );
}