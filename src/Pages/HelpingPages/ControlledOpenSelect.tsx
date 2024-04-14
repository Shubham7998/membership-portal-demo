import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface GenderModel {
  id: number;
  genderName: string;
}

interface ControlledOpenSelectProps {
  personName: number;
  handleChange: (event: SelectChangeEvent<string | number>) => void;
  gendersInfo: GenderModel[];
}

export default function ControlledOpenSelect(props: ControlledOpenSelectProps) {
  const { personName, handleChange, gendersInfo } = props;

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="gender-label">Gender</InputLabel>
      <Select
        labelId="gender-label"
        value={personName}
        onChange={handleChange}
        label="Gender"
      >
        <MenuItem value="">
          <em>Select Gender</em>
        </MenuItem>
        {gendersInfo?.map((gender, index) => (
         
          <MenuItem key={gender.id} value={gender.id}>
            {gender.genderName} index = {index = index + 1} {gender.id}
          </MenuItem>
        )) }
      </Select>
    </FormControl>
  );
}
