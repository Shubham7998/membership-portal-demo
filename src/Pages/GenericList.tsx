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
import ShowUserUtility from '../Utility/ShowUserUtility';
import Swal from 'sweetalert2';
import User from './User';
import { ProductModel } from '../Models/ProductModel';
import { SubscriberModel } from '../Models/SubscriberModel';
import { DiscountModel } from '../Models/DiscountModel';
import { TaxModel } from '../Models/TaxModel';
import GenderModel from '../Models/GenderModel';
import { userInfo } from 'os';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const userDataHeader = ["Sr. No.", "First Name", "Last Name", "Email", "Contact No."]
const subscriberDataHeader = ["Sr. No.", "First Name", "Last Name", "Email", "Contact No.", "Gender"]
const productDataHeader = ["Sr. No.", "Product Name", "Product Price"]
const discountDataHeader = ["Sr. No.", "Discount Code", "Discount Amount", "IsDiscountInPercentage"]
const taxDataHeader = ["Sr. No.", "SGST", "CGST", "Total Tax"]
const genderDataHeader = ["Sr. No.", "Gender"];


const handleButtons = ["Edit", "Delete"];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
// interface GenericListProps {
//     data?: UserModel | ProductModel | SubscriberModel | DiscountModel | TaxModel | GenderModel;
// }| ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];

interface GenericListProps {
    data: UserModel[] | ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    dataHeader: string[],
    isSearchMode: boolean
}
export default function GenericList({ data, handleDelete, handleEdit, dataHeader, isSearchMode }: GenericListProps) {

    ShowAlert();
    function ShowAlert() {
        console.log("data")
        console.log(data)
    }

    return (
        <>
            {/* <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 6, flexGrow: 1, p: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">

                            <TableHead>
                                <TableRow>
                                    {dataHeader.map((user, index) => (
                                        <StyledTableCell key={index} align="left">{user}</StyledTableCell>
                                    ))}
                                    {!isSearchMode && <StyledTableCell align="left"></StyledTableCell>}
                                    {!isSearchMode ? handleButtons.map((btn, index) => (
                                        <StyledTableCell key={index} align="left">{btn}</StyledTableCell>
                                    )) : ""}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((item: any, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="left" component="th" scope="row">
                                            {++index}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{item.firstName || item.productName || item.discountCode || item.sgst || item.gender}</StyledTableCell>
                                        <StyledTableCell align="left">{item.lastName || item.price || item.discountAmount || item.cgst}</StyledTableCell>
                                        <StyledTableCell align="left">{item.email || item.isDiscountInPercentage || item.totalTax}</StyledTableCell>
                                        <StyledTableCell align="left">{item.contactNumber}</StyledTableCell>
                                        <StyledTableCell align="left">{item.genderId}</StyledTableCell>
                                        {!isSearchMode && (
                                            <StyledTableCell align="left">
                                                <EditIcon onClick={() => handleEdit(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                            </StyledTableCell>
                                        )}
                                        {!isSearchMode && (
                                            <StyledTableCell align="left">
                                                <DeleteIcon onClick={() => handleDelete(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                            </StyledTableCell>
                                        )}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                    <TableHead>
                        <TableRow>
                            {dataHeader.map((data, index) => (
                                <StyledTableCell key={index} align="left">{data}</StyledTableCell>
                            ))}
                            {!isSearchMode ? handleButtons.map((btn, index) => (
                                <StyledTableCell key={index} align="left">{btn}</StyledTableCell>
                            )) : ""}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item: any, index) => (
                            <StyledTableRow key={index}>
                                {Object.values(item).map((value: any, idx) => (
                                    <StyledTableCell key={idx} align="left">
                                        {value} 
                                    </StyledTableCell>
                                ))}
                                {!isSearchMode && (
                                    <StyledTableCell align="left">
                                        <EditIcon onClick={() => handleEdit(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                    </StyledTableCell>
                                )}
                                {!isSearchMode && (
                                    <StyledTableCell align="left">
                                        <DeleteIcon onClick={() => handleDelete(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                    </StyledTableCell>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
// {
//     isSearchMode ? "" :
//         <div>
//             <StyledTableCell align="left" ><DeleteIcon onClick={() => handleDelete(item.id)} color="primary" sx={{ border: 'none' }}></DeleteIcon></StyledTableCell>
//             <StyledTableCell align="left" ><EditIcon color="primary" sx={{ cursor: 'pointer' }} onClick={() => handleEdit(item.id)} /></StyledTableCell>
//         </div>
// }
{/* {!isSearchMode && <StyledTableCell align="left">Actions</StyledTableCell>} */ }
{/* <StyledTableCell align="left">
                                            <EditIcon onClick={() => handleEdit(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                        </StyledTableCell> */}
// scope="row"

{/* <StyledTableCell align="left">
                                    {item.firstName || item.productName || item.discountCode || item.sgst || item.gender}
                                    </StyledTableCell>
                                <StyledTableCell align="left">{item.lastName || item.price || item.discountAmount || item.cgst}</StyledTableCell>
                                <StyledTableCell align="left">{item.email || item.isDiscountInPercentage || item.totalTax}</StyledTableCell>
                                <StyledTableCell align="left">{item.contactNumber}</StyledTableCell>
                                <StyledTableCell align="left">{item.genderId}</StyledTableCell> */}