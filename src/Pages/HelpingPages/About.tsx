import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import SideNav from './SideNav';

export default function About() {
    return (
        <>
            <Navbar />
            <Box height={30}/>
                <Box sx={{ display: 'flex' }}>
                    <SideNav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <h1>About</h1>
                   
                </Box>
            </Box>
        </>
    );
}
 