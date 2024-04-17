import * as React from 'react';
import { useParams } from 'react-router-dom';
import SubscriberUtility from '../Utility/SubscriberUtility';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    Paper, Grid, TextField, InputLabel,
    MenuItem, FormControl, Button, InputAdornment, Snackbar, Alert
} from "@mui/material";
import SideNav from './HelpingPages/SideNav';
import SubscriptionUtility from '../Utility/SubscriptionUtility';
import dayjs, { Dayjs } from 'dayjs';
import GenericSnackbar from '../Generics/Snackbar/SnackBar';
import OnChangeFields from '../Generics/OnChangeFields';




export default function Subscription() {
    const { id = 0 } = useParams();
    const { errors, handleNumberChange, genders, setSubscriberInfo, handleChange, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity } = SubscriberUtility(+id);
    const { handleTextChange, handleSubmit, handleSelectChange, subscriberInfo, handleDateFieldChange, navigate, subscriptionInfo, productInfo, discountInfo,setSubscriptionInfo } = SubscriptionUtility(+id);
    const {
        onSelectFieldChange,
        onDateFieldChange,
        onTextFieldChange,
        onNumberFieldChange
    } =  OnChangeFields();
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
                                        disabled = { id != 0}
                                        required
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setSubscriptionInfo)}
                                    >
                                        <MenuItem value={0}>Select Subscriber</MenuItem>
                                        {subscriberInfo?.map((subscriber, key) => (
                                            <MenuItem key={subscriber.id} value={subscriber.id}>{subscriber.firstName + " " + subscriber.lastName}</MenuItem>
                                        ))}

                                    </Select>
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
                                </FormControl>
                            </Grid>
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
                                        onChange={(event: SelectChangeEvent<string>) => onSelectFieldChange(event, setSubscriptionInfo)}
                                    >
                                        <MenuItem value={0}>Select Discount Coupon</MenuItem>
                                        {discountInfo?.map((discount, key) => (
                                            <MenuItem key={discount.id} value={discount.id}>{discount.discountCode}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="expiryDate">Select Start Date</InputLabel>
                                <TextField
                                    fullWidth
                                    id="expiryDate"
                                    variant="outlined"
                                    size="small"
                                    name='expiryDate'
                                    type='date'
                                    value={subscriptionInfo.expiryDate}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTextFieldChange(event, setSubscriptionInfo)}
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
            <GenericSnackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
                message={snackbarMessage}
            />
        </>
    );
}
