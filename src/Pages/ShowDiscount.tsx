import React from 'react'
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import { Box, Button, Grid, Pagination, Snackbar, TextField } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ShowDiscountUtility from '../Utility/ShowDiscountUtility';
import AddButton from '../Generics/Components/Buttons/AddButton';
import PaginationComponent from '../Generics/Components/Pagination/PaginationComponent';
import GenericSnackbar from '../Generics/Components/Snackbar/SnackBar';
import GenericList from './GenericList';
import GenericButton from '../Generics/Components/Buttons/ButtonGeneric';
import OnChangeFields from '../Generics/OnChangeFields';
export default function ShowDiscount() {

    const { navigate, handleDelete, discountInfo,
        handleEdit, prevPage, nextPage, currentPage,
        changeCurrentPage, numbers, prevPageDisabled,
        nextPageDisabled, handleSearchClick, handleClear,
        handleSorting, searchDiscountInfo, setSearchDiscountInfo } = ShowDiscountUtility();
    const discountDataHeader = ["Discount Code", "Discount Amount", "IsDiscountInPercentage"]
    const sortColumn = ["discountCode", "discountAmount","id"];

    const {
        onTextFieldChange,

    } = OnChangeFields();

    console.log("discount info")
    console.log(discountInfo)
    return (
        <>

            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Discount List</h1>
                    <Grid container spacing={5} sx={{ marginBottom: 2 }}>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="discountCode"
                                name="discountCode"
                                label="Discount Code"
                                size='small'
                                variant="outlined"
                                autoComplete="off"
                                //InputLabelProps={{ shrink: subscriberUtility.SubscriberInfo.firstName !==""? true:false }}
                                inputProps={{ maxLength: 50 }}
                                value={searchDiscountInfo.discountCode}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchDiscountInfo
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="discountAmount"
                                name="discountAmount"
                                label="Discount Amount"
                                size='small'
                                variant="outlined"
                                autoComplete="off"
                                //InputLabelProps={{ shrink: subscriberUtility.SubscriberInfo.firstName !==""? true:false }}
                                inputProps={{ maxLength: 50 }}
                                value={searchDiscountInfo.discountAmount}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchDiscountInfo
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <GenericButton btnName='Search' handleSubmit={handleSearchClick} />
                        </Grid>
                        <Grid item xs={2}>
                            <GenericButton btnName='Clear' handleSubmit={handleClear} />
                        </Grid>
                        <Grid item xs={3.6}>
                            <AddButton path={"/discount"} />
                        </Grid>
                    </Grid>

                    <GenericList data={discountInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={discountDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
                    {/* <GenericSnackbar /> */}
                </Box>
            </Box >
        </>
    )
}
