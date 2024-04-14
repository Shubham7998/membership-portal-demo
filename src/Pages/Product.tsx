import { Alert, Button, Grid, Paper, Snackbar, TextField } from '@mui/material'
import React from 'react'
import SideNav from './HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../Utility/ProductUtility';

export default function Product() {

    const {id = 0} = useParams();

    const {
        productInfo,
        errors,
        onInputChangeproduct,
        handelShowList,
        snackbarOpen,
        handleTextChange,
        handleNumberChange,
        handleSnackbarClose,
        snackbarMessage,
        snackbarPosition,
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
                            <h1> {id === 0 ? "Add Product" : "Update Product"} </h1>
                            <Grid item xs={12} sx={{ marginBottom: 3, margin: 2 }}>
                                <TextField
                                    fullWidth
                                    id="productName"
                                    name="productName"
                                    label="Product Name"
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ maxLength: 100 }}
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
                                    value={productInfo.productName}
                                    onChange={onInputChangeproduct}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ marginBottom: 3, margin: 2 }}>
                                <TextField
                                    id="price"
                                    name="price"
                                    type="number"
                                    label="price"
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

