import { Alert, Button, CardActions, Grid, Paper, Snackbar, TextField } from '@mui/material'
import React from 'react'
import SideNav from '../HelpingPages/SideNav'
import { useParams } from 'react-router-dom'
import ProductUtility from '../../Utility/ProductUtility';
import GenericSnackbar from '../../Generics/Components/Snackbar/SnackBar';
import OnChangeFields from '../../Generics/OnChangeFields';

export default function Product() {

    const { id = 0 } = useParams();

    const {
        setProductInfo,
        productInfo,setErrors,
        errors, navigate,
        onInputChangeproduct,
        snackbarOpen,
        handleNumberChange,
        handleSnackbarClose,
        snackbarMessage,
        snackbarSeverity,
        handleSubmit,
    } = ProductUtility(+id);

    const { onTextFieldChange,
        onNumberFieldChange,
        onTextFieldChangeError,
        onNumberFieldChangeError
    } = OnChangeFields();

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={5} sm={8} md={2.8}>
                    <Paper elevation={3} style={{ padding: 40, height: 350 }}>
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
                                    inputProps={{ maxLength: 25 }}
                                    value={productInfo.productName}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChangeError(event, setProductInfo, setErrors, errors)}
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

                            <Grid item xs={12}  >
                                <TextField
                                    id="price"
                                    name="price"
                                    type="number"
                                    size='small'
                                    label="Price"
                                    variant="outlined"
                                    autoComplete="off"
                                    inputProps={{ maxLength: 6 }}
                                    fullWidth
                                    aria-label="Demo number input"
                                    placeholder="Type a number…"
                                    value={productInfo.price}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onNumberFieldChangeError(event, setProductInfo,setErrors,errors)}
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
                                <Grid item xs={5}>
                                    <CardActions style={{ justifyContent: "center", padding: 5 }}>

                                        <Button onClick={handleSubmit}
                                            variant="contained"
                                            color="primary"
                                            style={{ marginLeft: 70, marginRight: 12 }}
                                            fullWidth
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate("/showproducts")}
                                            fullWidth
                                        >
                                            List
                                        </Button>
                                    </CardActions>
                                </Grid>

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

