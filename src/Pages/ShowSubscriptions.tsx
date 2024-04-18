import React from 'react'
import { Box, Button } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import ShowSubcriptionUtility from '../Utility/ShowSubcriptionUtility';
import GenericFloatingTable from './GenericFloatingTable';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
export default function ShowSubscriptions() {

    const {navigate, subscriptionInfo, handleEdit, handleDelete } = ShowSubcriptionUtility();

    const subscriptionDataHeader = ["Sr. No.", "Subscriber Id",  "Product Name",
        "Product Price",  "Discount Code", "Discount Amount", "Start Date",
        "Expiry Date",  "CGST%", "SGST%", "Total tax Percent",
        "Tax Amount", "Final Amount"
    ];
    // const subscriptionDataHeader = ["Sr. No.", "Subscriber Id", "Product Id", "Product Name",
    //     "Product Price", "Discount Id", "Discount Id", "Discount Amount", "Start Date",
    //     "Expiry Date", "Price After Discount", "Tax Id", "CGST%", "SGST%", "Total tax Percent",
    //     "Tax Amount", "Final Amount"
    // ];

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscription List</h1>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/subscription")}
                            style={{ alignItems: "right" }}
                        >
                            Add
                            <AddCircleOutlineRoundedIcon />
                        </Button>
                    </div>
                    <GenericList data={subscriptionInfo} dataHeader={subscriptionDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
                </Box>
            </Box>
        </>
    )
}
