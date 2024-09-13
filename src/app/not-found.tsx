"use client";
import Link from 'next/link';
import Lottie404 from '@/lib/lottie/404';
import { Box, Typography } from '@mui/material';
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function NotFound() {
    return (
        <Box className="flex flex-col items-center justify-center h-screen bg-black relative ">
            <GoBackButton />
            <Typography variant="h1" className="text-center max-w-[80%]" > Il n&apos;y a rien a voir ici, vas t&apos;entraîner !</Typography>
            <Link href="/" className="h-[500px] w-[500px]">
                <Lottie404 />
            </Link>
        </Box>
    );
}

const GoBackButton = () => {
    return (
        <Link href="/" className="absolute top-16 left-16 hover:cursor-pointer aspect-square">
            <IoArrowBackCircleOutline className="text-white text-8xl" />
        </Link>
    );
}