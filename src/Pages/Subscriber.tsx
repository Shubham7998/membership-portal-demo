import * as React from 'react';
import { useParams } from 'react-router-dom';
import SubscriberUtility from '../Utility/SubscriberUtility';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    Paper, Grid, TextField,InputLabel,
    MenuItem,FormControl, Button,InputAdornment
} from "@mui/material";

export default function Subscriber() {
    const { id = 0 } = useParams();

    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value;
        const name = event.target.name;
    
        setSubscriberInfo(prev => ({ ...prev, [name]: val }));
    };

    const { handleSubmit,handleNumberChange,subscriberInfo, handleTextChange, gender,gendersInfo, handleSelectChange,setSubscriberInfo } = SubscriberUtility(+id);

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
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
                                    onChange={(e) => handleTextChange(e)}
                                    value={subscriberInfo.firstName}
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
                                required
                                onChange={(e) => handleTextChange(e)}
                                value={subscriberInfo.lastName}
                                // helperText={
                                //     errors.find(
                                //         (error) => error.parameterName === "lastName"
                                //     )?.errorMessage || ""
                                // }
                                // error={
                                //     !!errors.find(
                                //         (error) => error.parameterName === "lastName"
                                //     )
                                // }
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl fullWidth >
                                <InputLabel id="demo-select-small-label">Gender</InputLabel>
                                <Select
                                style={{height : 40}}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={subscriberInfo.genderId.toString()}
                                    label="Gender"
                                    name='genderId'
                                    required
                                    onChange={handleChange}
                                >
                                    {gender?.map((genders, key) => (
                                        <MenuItem value={key}>{genders.genderName}</MenuItem>
                                    ))}
                                </Select>
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
                                onChange={(e) => handleTextChange(e)}
                                value={subscriberInfo.email}
                                required
                                // helperText={
                                //     errors.find(
                                //         (error) => error.parameterName === 'email'
                                //     )?.errorMessage || ""
                                // }
                                // error={
                                //     !!errors.find(
                                //         (error) => error.parameterName == "email"
                                //     )
                                // }
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
                                value={subscriberInfo.contactNumber}
                                required
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        +91
                                      </InputAdornment>
                                    ),
                                  }}
                                // helperText={errors.find(
                                //     (error) => error.parameterName == "contactNumber"
                                //     )?.errorMessage || ""
                                // }
                                // error={
                                //     !!errors.find((error) => error.parameterName === "contactNumber")
                                // }
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
        </>
    );
}
