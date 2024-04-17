import React from 'react'
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField } from '@mui/material'
import SideNav from './HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../Utility/ProductUtility';
import DiscountUtility from '../Utility/DiscountUtility';
import TaxUtility from '../Utility/TaxUtility';
import GenericSnackbar from '../Generics/Snackbar/SnackBar';
export default function Tax() {
    const { id = 0 } = useParams();


    const { taxInfo,  handleNumberChange, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity }
        = TaxUtility(+id);

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1> {id === 0 ? "Add Tax" : "Update Tax"} </h1>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    id="cgst"
                                    name="cgst"
                                    size='small'
                                    placeholder="Type a number…"
                                    label="CGST %"
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ maxLength: 100 }}
                                    value={taxInfo.cgst}
                                    onChange={handleNumberChange}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "cgst"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "cgst"
                                        )
                                    }

                                />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    id="sgst"
                                    name="sgst"
                                    label="SGST %"
                                    size='small'
                                    variant="outlined"
                                    autoComplete="off"
                                    fullWidth
                                    aria-label="Demo number input"
                                    placeholder="Type a number…"
                                    value={taxInfo.sgst}
                                    onChange={handleNumberChange}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "sgst"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "sgst"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    id="totalTax"
                                    name="totalTax"
                                    label="Total Tax %"
                                    size='small'
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    value={Number(taxInfo.sgst) + Number(taxInfo.cgst)}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>

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
