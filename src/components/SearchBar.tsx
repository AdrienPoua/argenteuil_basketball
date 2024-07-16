// SearchBar.js
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange } : SearchBarProps ) => {
  return (
    <TextField
      variant="outlined"
      value={value}
      onChange={onChange}
      className="bg-white"
      placeholder='Inserez un mot-clé'
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default SearchBar;
