import React from 'react'
import { Box, Button } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import GenericList from './GenericList';
import ShowTaxUtility from '../Utility/ShowTaxUtility';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddButton from '../Generics/Components/Buttons/AddButton';
export default function ShowTax() {
    const { navigate,handleDelete, taxInfo, handleEdit } = ShowTaxUtility();
    const taxDataHeader = ["Sr. No.", "State Name", "SGST", "CGST", "Total Tax"];

    console.log("taxinfo")
    console.log(taxInfo)

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Tax List</h1>
                    <AddButton path={"/tax"} />
                    <GenericList data={taxInfo} dataHeader={taxDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
                </Box>
            </Box>
        </>
    )
}
