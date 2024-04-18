import React from 'react'
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import { Box, Button } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ShowDiscountUtility from '../Utility/ShowDiscountUtility';
export default function ShowDiscount() {

    const { navigate, handleDelete, discountInfo, handleEdit } = ShowDiscountUtility();
    const discountDataHeader = ["Sr. No.", "Discount Code", "Discount Amount", "IsDiscountInPercentage"]

    console.log("discount info")
    console.log(discountInfo)
    return (
        <>

            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Discount List</h1>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/discount")}
                            style={{ alignItems: "right" }}
                        >
                            Add
                            <AddCircleOutlineRoundedIcon />
                        </Button>
                    </div>
                    <GenericList data={discountInfo} dataHeader={discountDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
                </Box>
            </Box>
        </>
    )
}
