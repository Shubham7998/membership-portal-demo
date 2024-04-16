import React, { useState } from 'react';
import { Box, FormControl } from '@mui/material';
import Navbar from './Navbar';
import SideNav from './SideNav';
import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function About() {

  const handleSwirl = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>About</h1>
          <button onClick={handleSwirl}>help me</button>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  name=''
                  // value={new Dayjs(subscriptionInfo.startDate.toDateString())}
                  // value={value}
                  sx={{ width: '100%' }} // Apply inline style here
                  label="Basic date time picker"
                />
                <DateTimePicker onChange={onChange} value={value} />
              </DemoContainer>
            </LocalizationProvider>
            </FormControl>
        </Box>
      </Box>
    </>
  );
}
