import React from 'react'
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField } from '@mui/material'
import SideNav from './HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../Utility/ProductUtility';
import DiscountUtility from '../Utility/DiscountUtility';
export default function Discount() {
    const { id = 0 } = useParams();

    const {
    handleNumberChange, handleSelectChange, 
    handleSubmit, discoutInfo, 
    onInputChangeDiscount,errors,
    snackbarOpen,
    snackbarPosition, handleSnackbarClose,
    snackbarSeverity,snackbarMessage} = DiscountUtility(+id);

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
                                    inputProps={{ maxLength: 100 }}
                                    value={discoutInfo.discountCode}
                                    onChange={onInputChangeDiscount}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "discountCode"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "Discount"
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
                                    onChange={handleNumberChange}
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
                                        onChange={handleSelectChange}    
                                    >
                                        <MenuItem value={"true"}>Yes</MenuItem>
                                        <MenuItem value={"false"}>No</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>

                            </Grid>
                        </Grid>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                            message={snackbarMessage}
                            anchorOrigin={snackbarPosition}>
                            <Alert onClose={handleSnackbarClose}
                                severity={snackbarSeverity}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
