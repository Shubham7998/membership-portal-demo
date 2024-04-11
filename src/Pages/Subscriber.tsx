import { Button, Grid, Paper, TextField, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import SideNav from './HelpingPages/SideNav';
import { SnackbarOrigin } from "@mui/material";
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { error } from 'console';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import image from '../Images/pexels-photo-4761779.webp';


export default function Subscriber() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");


    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarPosition, setSnackbarPosition] =
        React.useState<SnackbarOrigin>({
            vertical: "top",
            horizontal: "center",
        });
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<
        "success" | "error" | "info" | "warning"
    >();
    const [showLastName, setShowLastName] = useState(true); // State to manage last name visibility


    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        setFirstName(value);

        // Clear errors for firstName when user starts typing
        if (errors.some(error => error.parameterName === "firstName")) {
            const updatedErrors = errors.filter(error => error.parameterName !== "firstName");
            setErrors(updatedErrors);
        }
    };

    const handleText2Change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;
        setLastName(value);

        // Clear errors for lastName when user starts typing
        if (errors.some(error => error.parameterName === "lastName")) {
            const updatedErrors = errors.filter(error => error.parameterName !== "lastName");
            setErrors(updatedErrors);
        }
    };


    const [errors, setErrors] = useState<ParameterErrorModel[]>([]);
    const newErrors: ParameterErrorModel[] = [];

    // newErrors = {
    //     "firstName" : "Enter a valid first name",
    //     "lastName" : "Enter a valid last name"
    // }

    const validate = () => {
        if (firstName.trim() === "") {

            newErrors.push({
                parameterName: "firstName",
                errorMessage: "Enter a valid first name"
            });

        }
        if (lastName.trim() === "") {

            newErrors.push({
                parameterName: "lastName",
                errorMessage: "Enter a valid last name"
            });
        }
    }
    const handleSubmit = () => {

        validate();
        if (newErrors.length == 0) {

            setSnackbarMessage("Record added successfully");
            setSnackbarSeverity("success");
        }
        else {
            setSnackbarMessage("Fields marked in red are required");
            setSnackbarSeverity("warning");
        }
        setErrors(newErrors);
        setSnackbarOpen(true);


    };

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (

        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1> User </h1>
                            <Grid item xs={12}>
                                <TextField
                                    type={'text'}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    name='firstName'
                                    onChange={handleTextChange}
                                    value={firstName}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>

                                        ),
                                    }}
                                    helperText={errors.find(error => error.parameterName === "firstName")?.errorMessage || ""}
                                    error={!!errors.find(error => error.parameterName === "firstName")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type={showLastName ? 'text' : 'password'}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    size="small"
                                    name='lastName'
                                    onChange={handleText2Change}
                                    value={lastName}
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
                                                    onClick={() => setShowLastName(!showLastName)}
                                                    edge="end"
                                                >
                                                    {showLastName ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={errors.find(error => error.parameterName === "lastName")?.errorMessage || ""}
                                    error={!!errors.find(error => error.parameterName === "lastName")}
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={snackbarPosition}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>

    );
}

