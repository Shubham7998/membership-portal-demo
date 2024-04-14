import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import Navbar from './HelpingPages/Navbar';
import { UserModel } from '../Models/UserModel';
import { useEffect, useState } from 'react';
import { DeleteUserService, GetAllUserService } from '../Services/UserService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { UserUtility } from '../Utility/UserUtility';
import ShowUserUtility from '../Utility/ShowUserUtility';
import { ConfirmationModal } from './HelpingPages/ConfirmationModel';
import Swal from 'sweetalert2';


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

const handleConfirmation = () => {
    // Handle confirmation logic here
    console.log("Confirmed!");
  };


export default function ShowUser() {

    const { handleDelete, userInfo, handleEdit } = ShowUserUtility();

    

    const handleSwirl = () => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      };

    return (
        <>
            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead  >
                                <TableRow  >
                                    <StyledTableCell align="left">Sr. No.</StyledTableCell>
                                    <StyledTableCell align="left">First Name </StyledTableCell>
                                    <StyledTableCell align="left">Last Name</StyledTableCell>
                                    <StyledTableCell align="left">Email</StyledTableCell>
                                    <StyledTableCell align="left">Contact No.</StyledTableCell>
                                    <StyledTableCell align="left">Delete</StyledTableCell>
                                    <StyledTableCell align="left">Edit</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userInfo?.map((user, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="left" component="th" scope="row">
                                            {++index}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{user.firstName}</StyledTableCell>
                                        <StyledTableCell align="left">{user.lastName}</StyledTableCell>
                                        <StyledTableCell align="left">{user.email}</StyledTableCell>
                                        <StyledTableCell align="left">{user.contactNumber}</StyledTableCell>
                                        <StyledTableCell align="left" ><DeleteIcon onClick={() => handleDelete(user.id)} color="primary" sx={{border : 'none'}}></DeleteIcon></StyledTableCell>
                                        <StyledTableCell align="left" ><EditIcon color="primary" sx={{ cursor: 'pointer' }} onClick={() => handleEdit(user.id)}/></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>


        </>
    );
}

