import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
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
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import OnChangeFields from '../Generics/OnChangeFields';
import GenericButton from '../Generics/Components/Buttons/ButtonGeneric';


export default function ShowSubscriber() {

    const { handleSorting, handleSnackbarClose,
        snackbarMessage, snackbarOpen, handleSearchClick,
        snackbarSeverity, navigate, handleDelete,
        subscriberInfo, handleEdit, prevPage, nextPage,
        currentPage, changeCurrentPage, numbers,
        prevPageDisabled, nextPageDisabled, setSearchSubscriberInfo,
        handleClear, searchSubscriberInfo } = ShowSubscriberUtility();

    const {
        onTextFieldChange,
        
    } = OnChangeFields();

    const subscriberDataHeader = ["First Name", "Last Name", "Contact No.", "Email", "Gender"]
    const sortColumn = ["firstName", "lastName", "contactNumber", "email", "genderId",];

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscriber List</h1>


                    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                size='small'
                                variant="outlined"
                                autoComplete="off"
                                //InputLabelProps={{ shrink: subscriberUtility.SubscriberInfo.firstName !==""? true:false }}
                                inputProps={{ maxLength: 50 }}
                                value={searchSubscriberInfo.firstName}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchSubscriberInfo
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                size='small'
                                label="Last Name"
                                variant="outlined"
                                autoComplete="off"
                                value={searchSubscriberInfo.lastName || ""}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchSubscriberInfo
                                    )
                                }
                                inputProps={{ maxLength: 50 }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                size='small'
                                label="Email Address"
                                variant="outlined"
                                autoComplete="off"
                                value={searchSubscriberInfo.email}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchSubscriberInfo
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="contactNumber"
                                name="contactNumber"
                                size='small'
                                label="Mobile No"
                                variant="outlined"
                                value={searchSubscriberInfo.contactNumber}
                                onChange={(e) =>
                                    onTextFieldChange(
                                        e,
                                        setSearchSubscriberInfo
                                    )
                                }
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>
                        <Grid item xs={1.2}>
                            <GenericButton btnName='Search' handleSubmit={handleSearchClick} />
                        </Grid>
                        <Grid item xs={1.2}>
                            <GenericButton btnName='Clear' handleSubmit={handleClear} />
                        </Grid>
                        <Grid item xs={1.6}>
                            <AddButton path={"/subscriber"} />
                        </Grid>
                    </Grid>
                    <GenericList data={subscriberInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={subscriberDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
                </Box>
            </Box>


        </>
    );
}

{/* <GenericSnackbar
                            open={snackbarOpen}
                            onClose={handleSnackbarClose}
                            severity={snackbarSeverity}
                            message={snackbarMessage}
                        /> */}