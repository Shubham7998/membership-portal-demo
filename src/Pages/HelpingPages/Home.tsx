import React from 'react';
import SideNav from './SideNav';
import Grid from '@mui/material/Grid';
import Navbar from './Navbar';
import "../../Dash.css";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Helpme2 from './Helpme2';
import Home1 from '../HelperComponents';

export default function Home() {
    return (
        <>
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Home1/>
            </Box>
        </>
    );
}

