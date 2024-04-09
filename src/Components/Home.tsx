import React from 'react';
import SideNav from './SideNav';
import Grid from '@mui/material/Grid';
import Navbar from './Navbar';
import '../Dash.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function Home() {
    return (
        <>
            <Navbar />
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ minWidth: 49 + "%", height: 140 }}>
                                    <CardContent>
                                        <div>
                                            <CreditCardIcon />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            $500.00
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{color : "#ccd1d"}}>
                                            Total Earnings
                                        </Typography>

                                    </CardContent>
                                </Card>
                                <Card sx={{ minWidth: 49 + "%", height: 140 }}>
                                <CardContent>
                                        <div>
                                            <ShoppingBagIcon />
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div">
                                            $500.00
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{color : "#ccd1d"}}>
                                            Total Earnings
                                        </Typography>

                                    </CardContent>

                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <Stack spacing={2} direction="row">
                                        <div className='iconstyle'>
                                            <StorefrontIcon />
                                        </div>
                                        <div className='paddingall'>
                                            <span className='pricetitle'>$230k</span>
                                            <br />
                                            <span className='pricesubtitle'>Total Income</span>
                                        </div>
                                    </Stack>
                                </Card>
                                <Card sx={{ maxWidth: 345 }}>
                                    <Stack spacing={2} direction="row">
                                        <div className='iconstyle'>
                                            <StorefrontIcon />
                                        </div>
                                        <div className='paddingall'>
                                            <span className='pricetitle'>$230k</span>
                                            <br />
                                            <span className='pricesubtitle'>Total Income</span>
                                        </div>
                                    </Stack>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card sx={{ height: 60 + "vh" }}>
                                <CardContent>
                                    ok
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={2.65}>
                            <Card sx={{ height: 60 + "vh" }}>
                                <CardContent>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>

                </Box>

            </Box>
        </>
    );
}
