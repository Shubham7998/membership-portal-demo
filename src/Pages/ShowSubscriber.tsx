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

    const { navigate, handleDelete, subscriberInfo, handleEdit } = ShowSubscriberUtility();

    const subscriberDataHeader = ["Sr. No.", "First Name", "Last Name", "Email", "Contact No.", "Gender"]


    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Subscriber List</h1>
                    <AddButton path={"/subscriber"} />
                    <GenericList data={subscriberInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={subscriberDataHeader} />
                </Box>
            </Box>


        </>
    );
}

{/* <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead  >
            <TableRow  >
                <StyledTableCell align="left">Sr. No.</StyledTableCell>
                <StyledTableCell align="left">First Name </StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Contact No.</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">Delete</StyledTableCell>
                <StyledTableCell align="left">Edit</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {subscriberInfo?.map((subscriber, index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell align="left" component="th" scope="row">
                        {++index}
                    </StyledTableCell>
                    <StyledTableCell align="left">{subscriber.firstName}</StyledTableCell>
                    <StyledTableCell align="left">{subscriber.lastName}</StyledTableCell>
                    <StyledTableCell align="left">{subscriber.email}</StyledTableCell>
                    <StyledTableCell align="left">{subscriber.contactNumber}</StyledTableCell>
                    <StyledTableCell align="left">{subscriber.genderId}</StyledTableCell>
                    <StyledTableCell align="left" onClick={() => handleDelete(subscriber.id)}><DeleteIcon color="primary" sx={{ cursor: 'pointer' }} /></StyledTableCell>
                    <StyledTableCell align="left" onClick={() => handleEdit(subscriber.id)}><EditIcon color="primary" sx={{ cursor: 'pointer' }} /></StyledTableCell>
                </StyledTableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer> */}