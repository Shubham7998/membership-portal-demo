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
// import { DesktopDatePicker, LocalizationProvider, MobileDatePicker, StaticDatePicker } from '@mui/x-date-pickers';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';



export default function Subscription() {
    const { id = 0 } = useParams();


    const { errors, handleSubmit, handleNumberChange, handleTextChange, genders, handleSelectChange, setSubscriberInfo, handleChange, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarPosition, snackbarSeverity } = SubscriberUtility(+id);
    const { subscriberInfo, navigate, subscriptionInfo, productInfo, discountInfo } = SubscriptionUtility(+id);

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
                                        required
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0}>---Select Subscriber---</MenuItem>
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
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0}>---Select Product---</MenuItem>
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
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0}>---Select Discount Coupon---</MenuItem>
                                        {discountInfo?.map((discount, key) => (
                                            <MenuItem key={discount.id} value={discount.id}>{discount.discountCode}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={26}>
                                <FormControl fullWidth >
                                    
                                </FormControl>
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={snackbarPosition}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
