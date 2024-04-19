import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: '#2196f3', // Blue color
    color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ShowSubscriber() {

    const {handleSorting, navigate, handleDelete, subscriberInfo, handleEdit,prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled,  } = ShowSubscriberUtility();

    const subscriberDataHeader = [ "First Name", "Last Name",  "Contact No.","Email", "Gender"]
    const sortColumn = ["firstName", "lastName","contactNumber","email","genderId",];

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscriber List</h1>
                    <AddButton path={"/subscriber"} />
                    <GenericList2  data={subscriberInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={subscriberDataHeader} tableName={sortColumn} handleSorting={handleSorting}/>
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
                </Box>
            </Box>


        </>
    );
}
