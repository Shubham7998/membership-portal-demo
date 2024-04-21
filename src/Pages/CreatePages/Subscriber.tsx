import * as React from 'react';
import { useParams } from 'react-router-dom';
import SubscriberUtility from '../../Utility/SubscriberUtility';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    Paper, Grid, TextField, InputLabel,
    MenuItem, FormControl, Button, InputAdornment, Snackbar, Alert,
    CardActions
} from "@mui/material";
import SideNav from '../HelpingPages/SideNav';
import GenericSnackbar from '../../Generics/Components/Snackbar/SnackBar';
import OnChangeFields from '../../Generics/OnChangeFields';
import CustomHelperText from '../../Generics/Components/CustomHelperText';

export default function Subscriber() {
    const { id = 0 } = useParams();


    const { errors, navigate, handleSubmit, subscriberInfo, genders, setSubscriberInfo, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity } = SubscriberUtility(+id);
    const {
        onSelectFieldChange,
        onDateFieldChange,
        onTextFieldChange,
        onNumberFieldChange
    } = OnChangeFields();
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1>Subscriber</h1>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    size="small" // Set size to "small"
                                    name="firstName"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChange(event, setSubscriberInfo)}
                                    value={subscriberInfo.firstName}
                                    required
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "firstName"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "firstName"
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChange(event, setSubscriberInfo)}
                                    value={subscriberInfo.lastName}
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
                            <Grid item xs={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="genderId">Gender</InputLabel>
                                    <Select
                                        style={{ height: 40 }}
                                        labelId="genderId"
                                        id="genderId"
                                        value={subscriberInfo.genderId.toString()}
                                        label="Gender"
                                        name='genderId'
                                        required

                                        error={
                                            !!errors.find(
                                                (error) => error.parameterName === "genderId"
                                            )
                                        }
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setSubscriberInfo)}
                                    >
                                        <MenuItem value={-1}>---Select Gender---</MenuItem>
                                        {genders?.map((gender, key) => (
                                            <MenuItem key={gender.id} value={gender.id}>{gender.genderName}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.find(error => error.parameterName === "genderId") && (
                                        <CustomHelperText children={"Please select gender"} />
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                    name='email'
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChange(event, setSubscriberInfo)}
                                    value={subscriberInfo.email}
                                    required
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
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onNumberFieldChange(event, setSubscriberInfo)}
                                    value={subscriberInfo.contactNumber}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                +91
                                            </InputAdornment>
                                        ),
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
                            <Grid item xs={5}>
                                <CardActions style={{ justifyContent: "center", padding: 5 }}>

                                    <Button onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{ marginRight: 12 }}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate("/showsubscribers")}
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
        </>
    );
}
