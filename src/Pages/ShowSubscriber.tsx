import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import Navbar from './HelpingPages/Navbar';
import { UserModel } from '../Models/UserModel';
import { useEffect, useState } from 'react';
import { DeleteUserService, GetAllUserService } from '../Services/UserService';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { UserUtility } from '../Utility/UserUtility';
import ShowUserUtility from '../Utility/ShowUserUtility';
import ShowSubscriberUtility from '../Utility/ShowSubscriberUtility';
import GenericList from './GenericList';
import AddButton from '../Generics/Components/Buttons/AddButton';
import GenericList2 from './HelpingPages/Helpme2';
import PaginationComponent from '../Generics/Components/Pagination/PaginationComponent';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';
import GenericSnackbar from '../Generics/Components/Snackbar/SnackBar';
import SearchComponent from '../Generics/Components/SearchComponents/SearchComponent';


export default function ShowSubscriber() {

    const { handleSorting, handleSnackbarClose,
        snackbarMessage, snackbarOpen,
        snackbarSeverity, navigate, handleDelete, subscriberInfo, handleEdit, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, searchSubscriberInfo } = ShowSubscriberUtility();

    const subscriberDataHeader = ["First Name", "Last Name", "Contact No.", "Email", "Gender"]
    const sortColumn = ["firstName", "lastName", "contactNumber", "email", "genderId",];

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscriber List</h1>
                    <AddButton path={"/subscriber"} />

                    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>


                        {/* Second version with searchSubscriberInfo */}
                        {subscriberDataHeader.map((header, index) => (
                            <TextField
                                key={index}
                                select
                                label={header}
                                // value={filterValues[index]}
                                // onChange={(e) => handleFilterChange(index, e.target.value)}
                                variant="outlined"
                                style={{ minWidth: '150px' }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {searchSubscriberInfo.map((option, idx) => (
                                    <MenuItem key={idx} value={option.id}>
                                        {option.lastName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>

                        <SearchComponent />
                        <SearchComponent />
                        <SearchComponent />
                    </Box>

                    <GenericList data={subscriberInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={subscriberDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
                    {/* <GenericSnackbar
                            open={snackbarOpen}
                            onClose={handleSnackbarClose}
                            severity={snackbarSeverity}
                            message={snackbarMessage}
                        /> */}
                </Box>
            </Box>


        </>
    );
}
