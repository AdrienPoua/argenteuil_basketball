import React from 'react';
import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Arrow({open} : Readonly<{ open : boolean}>) {
  return (
    <Box className="bg-transparent">
      <ArrowDropDownIcon 
      className={`${open ? 'transform -rotate-90' : ''} transition-transform duration-300 ease-in-out text-black`}
      fontSize='large'
      />
    </Box>
  )
}

