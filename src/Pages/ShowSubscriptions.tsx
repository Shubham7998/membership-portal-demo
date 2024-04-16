import React from 'react'
import { Box } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import ShowSubcriptionUtility from '../Utility/ShowSubcriptionUtility';
export default function ShowSubscriptions() {

    const { subscriptionInfo, handleEdit, handleDelete } = ShowSubcriptionUtility();

    const subscriptionDataHeader = ["Sr. No.", "Subscriber Id", "Product Id", "Product Name",
        "Product Price", "Discount Id", "Discount Id", "Discount Amount", "Start Date",
        "Expiry Date", "Price After Discount", "Tax Id", "CGST%", "SGST%", "Total tax Percent",
        "Tax Amount", "Final Amount"
    ];




    return (
        <>

            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscription List</h1>
                    <GenericList data={subscriptionInfo} dataHeader={subscriptionDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
                </Box>
            </Box>
        </>
    )
}
