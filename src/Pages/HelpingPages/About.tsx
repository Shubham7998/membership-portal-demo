import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import SideNav from './SideNav';
import Swal from 'sweetalert2';

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
      
    return (
        <>
            <Navbar />
            <Box height={30}/>
                <Box sx={{ display: 'flex' }}>
                    <SideNav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <h1>About</h1>
                        <button onClick={handleSwirl}>help me</button>
                   
                </Box>
            </Box>
        </>
    );
}
 