import { Button, CardActions, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'
import SideNav from '../HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import GenderUtility from '../../Utility/GenderUtility';
import OnChangeFields from '../../Generics/OnChangeFields';
import CustomHelperText from '../../Generics/Components/CustomHelperText';

export default function Gender() {

    const { id = 0 } = useParams();

    const {
        errors, setErrors,
        handleSubmit,
        genderInfo, genders,
        handelShowList,
        snackbarOpen,
        handleSnackbarClose,
        snackbarMessage, navigate,
        fetchGenderData, setGenderInfo,
        snackbarSeverity,
    } = GenderUtility(+id);

    const { onTextFieldChange,
        onNumberFieldChange,
        onTextFieldChangeError, onSelectFieldChange,
        onNumberFieldChangeError
    } = OnChangeFields();

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1> {id === 0 ? "Add Gender" : "Update Gender"} </h1>
                            <Grid item xs={12}>
                                <FormControl fullWidth >

                                    <InputLabel id="genderName">Select Gender Name</InputLabel>
                                    <Select
                                        style={{ height: 40 }}
                                        labelId="genderName"
                                        id="genderName"
                                        value={genderInfo.genderName}
                                        label="Select Gender Name"
                                        name='genderName'
                                        disabled={id != 0}
                                        required
                                        error={
                                            !!errors.find(
                                                (error) => error.parameterName === "genderName"
                                            )
                                        }
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setGenderInfo)}
                                    >
                                        {genderInfo.genderName === "" ?
                                            <MenuItem value="">Select Gender name</MenuItem> :
                                            <MenuItem value={genderInfo.genderName}>{genderInfo.genderName}</MenuItem>
                                        }
                                        {genders?.map((gender, key) => (
                                            <MenuItem key={key} value={gender}>{gender}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.find(error => error.parameterName === "genderName") && (
                                        <CustomHelperText children={"Please select gender"} />
                                    )}
                                </FormControl>
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
                                        onClick={() => navigate("/showgenders")}
                                        fullWidth
                                    >
                                        List
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid >
        </div >
    )
}
