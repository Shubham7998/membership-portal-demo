import React from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import SideNav from '../HelpingPages/SideNav';
import ShowUserUtility from '../../Utility/ShowUserUtility';
import GenericList from './GenericList';
import ShowSubcriptionUtility from '../../Utility/ShowSubcriptionUtility';
import GenericFloatingTable from '../GenericFloatingTable';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddButton from '../../Generics/Components/Buttons/AddButton';
import PaginationComponent from '../../Generics/Components/Pagination/PaginationComponent';
import GenericButton from '../../Generics/Components/Buttons/ButtonGeneric';
import { DiscountModel } from '../../Models/DiscountModel';
import { ProductModel } from '../../Models/ProductModel';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SubscriberModel } from '../../Models/SubscriberModel';
import OnChangeFields from '../../Generics/OnChangeFields';

export default function ShowSubscriptions() {

    const { handleSorting, handleDelete, subscriptionInfo,
        handleEdit, navigate, prevPage, nextPage, currentPage,
        changeCurrentPage, numbers, prevPageDisabled,
        nextPageDisabled, snackbarOpen, subscriberInfo
        , discountInfo, productInfo,
        handleSnackbarClose, searchSubscriptionInfo, searchMode,
        snackbarMessage, handleClear, setSearchSubscriptionInfo,
        snackbarSeverity, handleSearchClick } = ShowSubcriptionUtility();

    const subscriptionDataHeader = ["Subscriber Id", "Product Name",
        "Product Price", "Discount Code", "Discount Amount", "Start Date",
        "Expiry Date", "Price After Discount", "CGST%", "SGST%", "Total tax Percent",
        "Tax Amount", "Final Amount"
    ];

    const sortColumn = [
        "subscriberId",
        "productName",
        "productPrice",
        "discountCode",
        "discountAmount",
        "startDate",
        "expiryDate",
        "priceAfterDiscount",
        "cgst",
        "sgst",
        "totalTaxPercentage",
        "taxAmount",
        "finalAmount",
    ];

    const {
        onTextFieldChange,
        onSelectFieldChange

    } = OnChangeFields();


    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscription List</h1>
                    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="subscriberId"> Select Subscriber</InputLabel>
                                <Select
                                    fullWidth
                                    required
                                    labelId="subscriberId"
                                    id="subscriberId"
                                    size='small'
                                    name="subscriberId"
                                    label="Select Subscriber"
                                    value={searchSubscriptionInfo.subscriberId.toString()}
                                    onChange={(e: SelectChangeEvent<string>) =>
                                        onSelectFieldChange(
                                            e,
                                            setSearchSubscriptionInfo
                                        )
                                    }
                                >
                                    <MenuItem value={0}>Select Subscriber</MenuItem>
                                    {subscriberInfo.map(
                                        (data: SubscriberModel) => (
                                            <MenuItem key={data.id} value={data.id}>
                                                {data.firstName} {"     "} {data.lastName}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="productName">Select Product</InputLabel>
                                <Select
                                    fullWidth
                                    required
                                    labelId="productName"
                                    id="productName"
                                    name="productName"
                                    size='small'
                                    label="Select Product"
                                    value={searchSubscriptionInfo.productName}
                                    onChange={(e: SelectChangeEvent<string>) =>
                                        onSelectFieldChange(
                                            e,
                                            setSearchSubscriptionInfo
                                        )
                                    }
                                >
                                    <MenuItem value={0}>Select ProductId</MenuItem>
                                    {productInfo.map(
                                        (data: ProductModel) => (
                                            <MenuItem key={data.id} value={data.productName}>
                                                {data.productName} ( $ {data.price})
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="discountCode">Select Discount</InputLabel>
                                <Select
                                    fullWidth
                                    required
                                    labelId="demo-simple-select-label"
                                    id="discountCode"
                                    size='small'
                                    name="discountCode"
                                    label="Select Discount"
                                    value={searchSubscriptionInfo.discountCode}
                                    onChange={(e: SelectChangeEvent<string>) =>
                                        onSelectFieldChange(
                                            e,
                                            setSearchSubscriptionInfo
                                        )
                                    }
                                >
                                    <MenuItem value={0}>Select Discount</MenuItem>
                                    {discountInfo.map(
                                        (data: DiscountModel) => (
                                            <MenuItem key={data.id} value={data.discountCode}>
                                                {data.discountCode} = {data.discountAmount}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={2}  >
                            <FormControl fullWidth>
                                <label id="startDate">Start Date</label>
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    autoComplete="startDate"
                                    id="startDate"
                                    name="startDate"
                                    size='small'
                                    value={searchSubscriptionInfo.startDate}
                                    onChange={(e) =>
                                        onTextFieldChange(
                                            e,
                                            setSearchSubscriptionInfo
                                        )
                                    }
                                />
                            </FormControl>
                        </Grid>*/}

                        <Grid item xs={2}>
                            <FormControl fullWidth >
                                {/* <label id="expiryDate"> Expiry Date</label> */}
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    size='small'
                                    autoComplete="expiryDate"
                                    name="expiryDate"
                                    value={searchSubscriptionInfo.expiryDate}
                                    onChange={(e) =>
                                        onTextFieldChange(
                                            e,
                                            setSearchSubscriptionInfo
                                        )
                                    }
                                />
                            </FormControl>
                        </Grid> 
                        <Grid item xs={1.2}>
                            <GenericButton btnName='Search' handleSubmit={handleSearchClick} />
                        </Grid>
                        <Grid item xs={1.2}>
                            <GenericButton btnName='Clear' handleSubmit={handleClear} />
                        </Grid>
                        <Grid item xs={1.6}>
                            <AddButton path={"/subscription"} />
                        </Grid>
                    </Grid>
                    {subscriptionInfo !== null ?
                        <GenericList data={subscriptionInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={searchMode} dataHeader={subscriptionDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                        : <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Table is empty</h1>
                    }
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />

                </Box>
            </Box>
        </>
    )
}
