import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SideNav from '../HelpingPages/SideNav'
import ShowGenderUtility from '../../Utility/List/ShowGenderUtility'
import PaginationComponent from '../../Generics/Components/Pagination/PaginationComponent'
import GenericList from './GenericList'
import AddButton from '../../Generics/Components/Buttons/AddButton'

export default function ShowGender() {

    const { handleDelete, genderInfo,
        handleEdit, navigate, handleSorting,
        setGenderInfo
        , prevPage, nextPage, currentPage, changeCurrentPage,
        numbers, prevPageDisabled,
        nextPageDisabled } = ShowGenderUtility();

    const genderDataHeader = ["GenderName"];

    const sortColumn = ["genderName"];
    return (
        <div>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'end' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Gender List</h1>

                    <AddButton path={"/gender"} />
                    <GenericList data={genderInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={genderDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    <Grid sx={{marginTop : 3}} style={{ display: 'flex', justifyContent: 'center' }}>
                        <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

// sx={{ marginTop: 0 }}