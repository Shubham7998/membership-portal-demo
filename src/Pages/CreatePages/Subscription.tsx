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
import SubscriptionUtility from '../../Utility/SubscriptionUtility';
import dayjs, { Dayjs } from 'dayjs';
import GenericSnackbar from '../../Generics/Components/Snackbar/SnackBar';
import OnChangeFields from '../../Generics/OnChangeFields';
import CustomHelperText from '../../Generics/Components/CustomHelperText';
import { useEffect, useState } from 'react';




export default function Subscription() {
    const { id = 0 } = useParams();
    const { errors, handleSubmit, handleSelectChange, subscriberInfo, handleDateFieldChange, navigate, subscriptionInfo, productInfo, discountInfo, setSubscriptionInfo, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity } = SubscriptionUtility(+id);
    const {
        onSelectFieldChange,
        onTextFieldChange
    } = OnChangeFields();

    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        // Calculate product price
        const productPrice = subscriptionInfo.productId !== 0 ? productInfo.find(product => product.id === subscriptionInfo.productId)?.price || 0 : 0;

        // Calculate discount amount
        const discountAmount = subscriptionInfo.discountId !== 0 ? (discountInfo.find(discount => discount.id === subscriptionInfo.discountId)?.isDiscountInPercentage ?
            (productPrice * ((discountInfo.find(discount => discount.id === subscriptionInfo.discountId)?.discountAmount || 0) / 100)) :
            (discountInfo.find(discount => discount.id === subscriptionInfo.discountId)?.discountAmount || 0)) : 0;

        // Calculate total price after discount
        const totalPriceAfterDiscount = productPrice - discountAmount;

        // Update total price
        setTotalPrice(totalPriceAfterDiscount);
    }, [subscriptionInfo.productId, subscriptionInfo.discountId, productInfo, discountInfo]);

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 20, height: '100vh' }}>
                <SideNav />
                <Grid item xs={3} sm={6} md={3}>
                    <Paper elevation={3} style={{ padding: 20 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <h1>Subscription</h1>
                            <Grid item xs={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="subscriberId">Select Subscriber</InputLabel>
                                    <Select
                                        style={{ height: 40 }}
                                        labelId="subscriberId"
                                        id="subscriberId"
                                        value={subscriptionInfo.subscriberId.toString()}
                                        label="Select Subscriber"
                                        name='subscriberId'
                                        disabled={id != 0}
                                        required
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setSubscriptionInfo)}
                                    >
                                        <MenuItem value={0}>Select Subscriber</MenuItem>
                                        {subscriberInfo?.map((subscriber, key) => (
                                            <MenuItem key={subscriber.id} value={subscriber.id}>{subscriber.firstName + " " + subscriber.lastName}</MenuItem>
                                        ))}

                                    </Select>
                                    {errors.find(error => error.parameterName === "subscriberId") && (
                                        <CustomHelperText children={"Please select Subscriber"} />
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="productId">Select Product</InputLabel>
                                    <Select
                                        style={{ height: 40 }}
                                        labelId="productId"
                                        id="productId"
                                        value={subscriptionInfo.productId.toString()}
                                        label="Select Product"
                                        name='productId'
                                        required
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setSubscriptionInfo)}                                    >
                                        <MenuItem value={0}>Select Product</MenuItem>
                                        {productInfo?.map((product, key) => (
                                            <MenuItem key={product.id} value={product.id}>{product.productName}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.find(error => error.parameterName === "productId") && (
                                        <CustomHelperText children={"Please select Product"} />
                                    )}
                                </FormControl>
                            </Grid>
                            {subscriptionInfo.productId == 0 ? "" :
                                <span style={{ color: "green" }}>Product Price = {productInfo.find(product => product.id === subscriptionInfo.productId)?.price}</span>
                            }
                            <Grid item xs={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="discountId">Select Discount Coupon</InputLabel>
                                    <Select
                                        style={{ height: 40 }}
                                        labelId="discountId"
                                        id="discountId"
                                        value={subscriptionInfo.discountId.toString()}
                                        label="Select Discount Coupon"
                                        name='discountId'
                                        required
                                        disabled={subscriptionInfo.productId == 0}
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setSubscriptionInfo)}
                                    >
                                        <MenuItem value={0}>Select Discount Coupon</MenuItem>
                                        {discountInfo?.map((discount, key) => (
                                            <MenuItem key={discount.id} value={discount.id}>{discount.discountCode}</MenuItem>
                                        ))}

                                    </Select>
                                    {errors.find(error => error.parameterName === "discountId") && (
                                        <CustomHelperText children={"Please select Discount"} />
                                    )}
                                </FormControl>
                            </Grid>
                            {subscriptionInfo.discountId === 0 ? "" :
                                <span style={{ color: "green" }}>
                                    Discount = {discountInfo.find(discount => discount.id === subscriptionInfo.discountId)?.isDiscountInPercentage ?
                                        `${discountInfo.find(discount => discount.id === subscriptionInfo.discountId)?.discountAmount}%` :
                                        `₹${discountInfo.find(discount => discount.id === subscriptionInfo.discountId)?.discountAmount}`
                                    }
                                </span>
                            }
                            <Grid item xs={12}>
                                <InputLabel id="startDate">Select Start Date</InputLabel>
                                <TextField
                                    fullWidth
                                    id="startDate"
                                    variant="outlined"
                                    size="small"
                                    name='startDate'
                                    type='date'
                                    value={subscriptionInfo.startDate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChange(event, setSubscriptionInfo)}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === 'startDate'
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName == "startDate"
                                        )
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id="expiryDate">Select Expiry Date</InputLabel>
                                <TextField
                                    fullWidth
                                    id="expiryDate"
                                    variant="outlined"
                                    size="small"
                                    name='expiryDate'
                                    type='date'
                                    value={subscriptionInfo.expiryDate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChange(event, setSubscriptionInfo)}
                                    helperText={
                                        errors.find(
                                            (error) => error.parameterName === 'expiryDate'
                                        )?.errorMessage || ""
                                    }
                                    error={
                                        !!errors.find(
                                            (error) => error.parameterName == "expiryDate"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" item xs={12} >
                                {
                                    subscriptionInfo.productId == 0 ? "" : <span style={{ color: "green" }}>Total price : {totalPrice}</span>
                                }

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
                                        onClick={() => navigate("/showsubscriptions")}
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
