import React from 'react'
import { Alert, Button, CardActions, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material'
import SideNav from '../HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../../Utility/ProductUtility';
import DiscountUtility from '../../Utility/DiscountUtility';
import TaxUtility from '../../Utility/TaxUtility';
import GenericSnackbar from '../../Generics/Components/Snackbar/SnackBar';
import OnChangeFields from '../../Generics/OnChangeFields';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Tax() {
    const { id = 0 } = useParams();



    const { navigate, indianStates, taxInfo, handleNumberChange, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity, setTaxInfo }
        = TaxUtility(+id);

    const {
        onNumberFieldChange,
        onSelectFieldChange
    } = OnChangeFields();

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1> {id === 0 ? "Add Tax" : "Update Tax"} </h1>
                            <Grid item xs={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="stateName">Select State</InputLabel>
                                    <Select
                                        style={{ height: 40 }}
                                        labelId="stateName"
                                        id="stateName"
                                        value={taxInfo.stateName}
                                        label="Select State"
                                        name='stateName'
                                        disabled={id != 0}
                                        required
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setTaxInfo)}
                                    >
                                        {taxInfo.stateName === "" ?
                                            <MenuItem value="">Select State name</MenuItem> :
                                            <MenuItem value={taxInfo.stateName}>{taxInfo.stateName}</MenuItem>
                                        }
                                        {indianStates?.map((state, key) => (
                                            <MenuItem key={key} value={state}>{state}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    id="cgst"
                                    name="cgst"
                                    size='small'
                                    placeholder="Type a number…"
                                    label="CGST %"
                                    variant="outlined"
                                    defaultValue={""}
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
                                    onClick={() => navigate("/showtaxes")}
                                    fullWidth
                                >
                                    <VisibilityIcon />
                                    List
                                </Button>
                            </CardActions>
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
