import React from 'react'
import { Alert, Button, CardActions, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField } from '@mui/material'
import SideNav from '../HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../../Utility/ProductUtility';
import DiscountUtility from '../../Utility/DiscountUtility';
import GenericSnackbar from '../../Generics/Components/Snackbar/SnackBar';
import OnChangeFields from '../../Generics/OnChangeFields';

export default function Discount() {
    const { id = 0 } = useParams();

    const {
        handleSubmit, discoutInfo, errors,
        snackbarOpen, setDiscountInfo,
        handleSnackbarClose, navigate,setErrors,
        snackbarSeverity, snackbarMessage, handleSelectBooleanChange } = DiscountUtility(+id);

    const {
        onSelectFieldChange,
        onDateFieldChange,onNumberFieldChangeError,
        onTextFieldChange,onTextFieldChangeError,
        onNumberFieldChange
    } = OnChangeFields();


    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1> {id === 0 ? "Add Discount" : "Update Discount"} </h1>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    id="discountCode"
                                    name="discountCode"
                                    size='small'
                                    label="Discount Code"
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ maxLength: 25}}
                                    value={discoutInfo.discountCode}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChangeError(event, setDiscountInfo, setErrors, errors)}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "discountCode"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "discountCode"
                                        )
                                    }

                                />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    id="discountAmount"
                                    name="discountAmount"
                                    type="number"
                                    label="Discount Amount"
                                    size='small'
                                    variant="outlined"
                                    autoComplete="off"
                                    fullWidth
                                    aria-label="Demo number input"
                                    placeholder="Type a number…"
                                    value={discoutInfo.discountAmount}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onNumberFieldChangeError(event, setDiscountInfo,setErrors,errors)}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "discountAmount"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "discountAmount"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="isDiscountInPercentage">Discount In Percentage</InputLabel>
                                    <Select
                                        labelId="isDiscountInPercentage"
                                        id="isDiscountInPercentage"
                                        size='small'
                                        value={discoutInfo.isDiscountInPercentage.toString()}
                                        label="Discount In Percentage"
                                        name='isDiscountInPercentage'
                                        required
                                        onChange={handleSelectBooleanChange}
                                    >
                                        <MenuItem value={"true"}>Yes</MenuItem>
                                        <MenuItem value={"false"}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <CardActions style={{ justifyContent: "center", padding: 5 }}>

                                    <Button onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: 12 }}
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate("/showdiscounts")}
                                        fullWidth
                                    >
                                        List
                                    </Button>
                                </CardActions>

                            </Grid>
                        </Grid>
                        <GenericSnackbar
                            open={snackbarOpen}
                            onClose={handleSnackbarClose}
                            severity={snackbarSeverity}
                            message={snackbarMessage}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
