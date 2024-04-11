import React, { useState } from 'react'
import { UserModel } from '../Models/UserModel'
import { Button, Grid, Paper, TextField } from '@mui/material';
import { userInfo } from 'os';
import { UserUtility } from '../Utility/UserUtility';
import { useParams } from 'react-router-dom';
import SideNav from './SideNav';

export default function User() {

    const {id = 0} = useParams();
    const {userInfo, handleTextChange, handleNumberChange, handleSelectChange, handleSubmit} = UserUtility(+id);

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
            <SideNav/>
            <Grid item xs={3} sm={6} md={3}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Grid container spacing={2} justifyContent="center">
                    <h1> User </h1>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="firstName"
                                label="First Name"
                                variant="outlined"
                                size="small"
                                name='firstName'
                                onChange={(e) => handleTextChange(e)}
                                value={userInfo.firstName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                variant="outlined"
                                size="small"
                                name='lastName'
                                onChange={(e) => handleTextChange(e)}
                                value={userInfo.lastName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                name='email'
                                onChange={(e) => handleTextChange(e)}
                                value={userInfo.email}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="contactNumber"
                                label="Contact Number"
                                variant="outlined"
                                size="small"
                                name='contactNumber'
                                onChange={(e) => handleNumberChange(e)}
                                value={userInfo.contactNumber}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                variant="outlined"
                                size="small"
                                name='password'
                                onChange={(e) => handleTextChange(e)}
                                value={userInfo.password}
                                required
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
