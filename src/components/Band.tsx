import React from "react";
import { Match } from "@/models";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

type bandProps = { match: Match };
export default function Band({ match }: Readonly<bandProps>) {
  return (
    <Box className='px-12 py-5 flex w-full bg-black text-zinc-50 font-bold text-3xl'>
      <Box className='flex flex-col justify-center'>
        <Typography className='tracking-wide'> {match.division}</Typography>
        <Typography className='uppercase tracking-wide inline-block '>
          {match.date}
        </Typography>
      </Box>
      <Box className='flex grow justify-center items-center relative mx-14'>
        <Image src={logo} alt='logo' className='w-40 h-40' width={40} height={80} />
        <Typography className='text-sky-500'>&nbsp; VS &nbsp;</Typography>
        <Box className='flex flex-col'>
          <Typography>{match.teamB}</Typography>
          <Typography className='m-auto absolute bottom-5 text-red-500'>
            {match.time.replace(":", "H")}
          </Typography>
          {match.cancel && (
            <Typography className='m-auto absolute top-5 text-red-500'>
              CANCELLED
            </Typography>
          )}
        </Box>
      </Box>
      <Box className='flex justify-center items-center text-xl'>
        {match.gym}
      </Box>
    </Box>
  );
}
