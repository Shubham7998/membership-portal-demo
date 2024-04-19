import React from 'react'
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import { Box, Button, Pagination, Snackbar } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ShowDiscountUtility from '../Utility/ShowDiscountUtility';
import AddButton from '../Generics/Components/Buttons/AddButton';
import PaginationComponent from '../Generics/Components/Pagination/PaginationComponent';
import GenericSnackbar from '../Generics/Components/Snackbar/SnackBar';
export default function ShowDiscount() {

    const { navigate, handleDelete, discountInfo, handleEdit, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled } = ShowDiscountUtility();
    const discountDataHeader = ["Discount Code", "Discount Amount", "IsDiscountInPercentage"]

    console.log("discount info")
    console.log(discountInfo)
    return (
        <>

            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Discount List</h1>
                    <AddButton path={"/discount"} />
                    {/* <GenericList data={discountInfo} dataHeader={discountDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} /> */}
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
                    {/* <GenericSnackbar /> */}
                </Box>
            </Box>
        </>
    )
}
