import { Alert, Button, Grid, Paper, Snackbar, TextField } from '@mui/material'
import React from 'react'
import SideNav from './HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../Utility/ProductUtility';
import GenericSnackbar from '../Generics/Snackbar/SnackBar';

export default function Product() {

    const { id = 0 } = useParams();

    const {
        productInfo,
        errors,
        onInputChangeproduct,
        snackbarOpen,
        handleNumberChange,
        handleSnackbarClose,
        snackbarMessage,
        snackbarSeverity,
        handleSubmit,
    } = ProductUtility(+id);

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1> {productInfo.id === 0 ? "Add Product" : "Update Product"} </h1>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="productName"
                                    name="productName"
                                    label="Product Name"
                                    size='small'
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ maxLength: 100 }}
                                    value={productInfo.productName}
                                    onChange={onInputChangeproduct}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "productName"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "productName"
                                        )
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    id="price"
                                    name="price"
                                    type="number"
                                    size='small'
                                    label="Price"
                                    variant="outlined"
                                    autoComplete="off"
                                    fullWidth
                                    aria-label="Demo number input"
                                    placeholder="Type a number…"
                                    value={productInfo.price}
                                    onChange={handleNumberChange}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === "price"
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName === "price"
                                        )
                                    }
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

