import React from 'react'
import { Box, Button } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import ShowSubcriptionUtility from '../Utility/ShowSubcriptionUtility';
import GenericFloatingTable from './GenericFloatingTable';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddButton from '../Generics/Components/Buttons/AddButton';
export default function ShowSubscriptions() {

    const { handleSorting, handleDelete, subscriptionInfo, 
        handleEdit ,navigate,prevPage, nextPage, currentPage,
         changeCurrentPage, numbers, prevPageDisabled,
          nextPageDisabled, snackbarOpen,
        handleSnackbarClose,searchSubscriptionInfo,searchMode,
        snackbarMessage,handleClear,setSearchSubscriptionInfo,
        snackbarSeverity,handleSearchClick } = ShowSubcriptionUtility();

    const subscriptionDataHeader = ["Subscriber Id", "Product Name",
        "Product Price", "Discount Code", "Discount Amount", "Start Date",
        "Expiry Date","Price After Discount","CGST%", "SGST%", "Total tax Percent",
        "Tax Amount", "Final Amount"
    ];

    const sortColumn = [
        "subscriberId",
        "productName",
        "Price",
        "discountCode",
        "discountAmount",
        "startDate",
        "expiryDate",
        "priceDiscount",
        "cgst",
        "sgst",
        "totalTaxPercentage",
        "taxAmount",
        "finalAmount",
      ];
    
    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscription List</h1>
                    <AddButton path={"/subscription"} />
                     {/* {subscriptionInfo === null ? */}
                    <GenericList data={subscriptionInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={searchMode} dataHeader={subscriptionDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    {/* :<h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Table is empty</h1>
                    }  */}
                </Box>
            </Box>
        </>
    )
}
