import React from 'react'
import { Box } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import ShowDiscountUtility from '../Utility/ShowDiscountUtility';
export default function ShowDiscount() {

    const { handleDelete, discountInfo, handleEdit } = ShowDiscountUtility();
    const discountDataHeader = ["Sr. No.", "Discount Code", "Discount Amount", "IsDiscountInPercentage"]

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Discount List</h1>
                    <GenericList data={discountInfo} dataHeader={discountDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
                </Box>
            </Box>
        </>
    )
}
