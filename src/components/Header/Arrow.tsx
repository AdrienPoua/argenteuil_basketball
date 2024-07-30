import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type PropsType = {
  open?: boolean;
  hidden?: boolean;
};

export default function Arrow({ open, hidden }: Readonly<PropsType>): ReactElement {
  return (
    <Box className="bg-transparent">
      <ArrowDropDownIcon
        className={`${open ? 'transform -rotate-90' : ''} transition-transform duration-300 ease-in-out text-black ${hidden ? 'text-transparent' : ''}`}
        fontSize='large'
      />
    </Box>
  )
}

