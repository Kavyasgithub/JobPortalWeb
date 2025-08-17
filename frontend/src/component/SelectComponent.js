import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectComponent = ({ value, onChange, options, label, defaultLabel }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
      >
        <MenuItem value="">{defaultLabel || `All ${label}s`}</MenuItem>
        {options && options.map((option) => (
          <MenuItem key={option._id || option.id || option} value={option._id || option.id || option}>
            {option.jobTypeName || option.name || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
