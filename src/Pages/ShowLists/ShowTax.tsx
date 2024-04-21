import React from 'react'
import { Box, Button, Grid, TextField } from '@mui/material';
import SideNav from '../HelpingPages/SideNav';
import GenericList from './GenericList';
import ShowTaxUtility from '../../Utility/ShowTaxUtility';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddButton from '../../Generics/Components/Buttons/AddButton';
import PaginationComponent from '../../Generics/Components/Pagination/PaginationComponent';
import GenericButton from '../../Generics/Components/Buttons/ButtonGeneric';
import OnChangeFields from '../../Generics/OnChangeFields';
export default function ShowTax() {
    const { navigate, handleDelete, taxInfo, handleEdit,
        prevPage, nextPage, currentPage, changeCurrentPage,
        numbers, prevPageDisabled, setTaxInfo, handleSearchClick, handleClear,
        nextPageDisabled, handleSorting, searchTaxInfo, setSearchTaxInfo,
    } = ShowTaxUtility();
    const taxDataHeader = ["State Name", "SGST", "CGST", "Total Tax"];
    const sortColumn = ["stateName", "sgst", "cgst", "totalTax"];
    const {
        onTextFieldChange,

    } = OnChangeFields();
    console.log("taxinfo")
    console.log(taxInfo)

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Tax List</h1>
                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>

                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="stateName"
                                name="stateName"
                                size='small'
                                label="State Name"
                                variant="outlined"
                                value={searchTaxInfo.stateName}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchTaxInfo
                                    )
                                }
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <GenericButton btnName='Search' handleSubmit={handleSearchClick} />
                        </Grid>
                        <Grid item xs={1.5}>
                            <GenericButton btnName='Clear' handleSubmit={handleClear} />
                        </Grid>
                        <Grid item xs={4}>
                            <AddButton path={"/tax"} />
                        </Grid>
                    </Grid>
                    <GenericList data={taxInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={taxDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />

                </Box>
            </Box>
        </>
    )
}
