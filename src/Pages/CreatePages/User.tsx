import React, { useState } from 'react'
import { UserModel } from '../../Models/UserModel'
import { Button, Grid, Paper, TextField, Snackbar, Alert, CardActions, IconButton } from '@mui/material';
import { userInfo } from 'os';
import { UserUtility } from '../../Utility/UserUtility';
import { useParams } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SideNav from '../HelpingPages/SideNav';
import { ParameterErrorModel } from '../../Models/ParameterErrorModel';
import { error } from 'console';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GenericSnackbar from '../../Generics/Components/Snackbar/SnackBar';
import OnChangeFields from '../../Generics/OnChangeFields';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

export default function User() {

    const { id = 0 } = useParams();
    const { setErrors, handleClear, setUserInfo, navigate, userInfo, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity } = UserUtility(+id);
    const { onTextFieldChange,
        onNumberFieldChange,
        onTextFieldChangeError,
        onNumberFieldChangeError
    } = OnChangeFields();
    const [showPassword, setShowPassword] = React.useState(false);


    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChangeError(event, setUserInfo, setErrors, errors)}
                                    value={userInfo.firstName}
                                    required
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "firstName"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "firstName" ? true : false
                                        )
                                    }
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
                                    required
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChangeError(event, setUserInfo, setErrors, errors)}
                                    value={userInfo.lastName}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "lastName"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "lastName"
                                        )
                                    }
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChangeError(event, setUserInfo, setErrors, errors)}
                                    value={userInfo.email}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        )}}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === 'email'
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName == "email"
                                        )
                                    }
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onNumberFieldChangeError(event, setUserInfo,setErrors,errors)}
                                    value={userInfo.contactNumber}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                +91
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            maxLength: 10, 
                                        },
                                    }}
                                    helperText={errors.find(
                                        (error) => error.parameterName == "contactNumber"
                                    )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find((error) => error.parameterName === "contactNumber")
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} >


                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    name='password'
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChangeError(event, setUserInfo, setErrors, errors)}
                                    value={userInfo.password}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle last name visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={errors.find(
                                        (error) => error.parameterName == "password"
                                    )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find((error) => error.parameterName === "password")
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <CardActions style={{ justifyContent: "center", padding: 5 }}>

                                    <Button onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleClear()}
                                        fullWidth
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate("/showusers")}
                                        fullWidth
                                    >
                                        List
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <GenericSnackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
                message={snackbarMessage}
            />
        </div>
    )
}