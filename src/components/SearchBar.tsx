// SearchBar.js
import React, { ReactElement } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type PropsType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Index({ value, onChange }: Readonly<PropsType>): ReactElement {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={onChange}
      className="bg-white"
      fullWidth
      placeholder='Inserez un mot-clé'
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

