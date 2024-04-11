import { Button, Grid, Paper, TextField, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import SideNav from './SideNav';
import { SnackbarOrigin } from "@mui/material";
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { error } from 'console';

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

    const handleSubmit = () => {
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

        setSnackbarMessage("Fields marked in red are required");
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setErrors(newErrors);

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
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    name='firstName'
                                    onChange={handleTextChange}
                                    value={firstName}
                                    required
                                    helperText={errors.find(error => error.parameterName === "firstName")?.errorMessage || ""}
                                    error={!!errors.find(error => error.parameterName === "firstName")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="lasName"
                                    label="last Name"
                                    variant="outlined"
                                    size="small"
                                    name='lasName'
                                    onChange={handleText2Change}
                                    value={lastName}
                                    required
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
                autoHideDuration={6000}
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

