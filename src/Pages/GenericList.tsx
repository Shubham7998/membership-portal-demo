import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserModel } from '../Models/UserModel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProductModel } from '../Models/ProductModel';
import { SubscriberModel } from '../Models/SubscriberModel';
import { DiscountModel } from '../Models/DiscountModel';
import { TaxModel } from '../Models/TaxModel';
import GenderModel from '../Models/GenderModel';
import { useState } from 'react';


const userDataHeader = ["Sr. No.", "First Name", "Last Name", "Email", "Contact No."]
const productDataHeader = ["Product Name", "Product Price"]


const handleButtons = ["Edit", "Delete"];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 2,
    },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        whiteSpace: 'pre-line', // Enable text wrapping
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

interface GenericListProps {
    data: UserModel[] | ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    dataHeader: string[],
    isSearchMode: boolean,
    tableName: string[],
    handleSorting: (tableName: string, sortOrder: string) => void
}


export default function GenericList(
    {
        data, handleDelete, handleEdit,
        dataHeader, isSearchMode, tableName, handleSorting
    }: GenericListProps) {

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    function handleSort(tableName: string): void {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        handleSorting(tableName, sortOrder);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <caption>A basic table example with a caption</caption>
                    <TableHead >
                        <TableRow >
                            <StyledTableCell align="left">Sr No</StyledTableCell>
                            {dataHeader.map((data, index) => (
                                <StyledTableCell onClick={() => handleSort(tableName[index])} key={index} align="center" sx={{cursor : "pointer"}}>{data} <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span></StyledTableCell>
                            ))}
                            {!isSearchMode ? handleButtons.map((btn, index) => (
                                <StyledTableCell key={index} align="left">{btn}</StyledTableCell>
                            )) : ""}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item: any, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">
                                    {++index}
                                </StyledTableCell>
                                {Object.entries(item).map(([key, value]: any, idx) => {
                                    if (
                                        key !== "id" &&
                                        key !== "discountId" &&
                                        key !== "taxId" &&
                                        key !== "productId" &&
                                        key !== "genderId"
                                    ) {
                                        if (key === "isDiscountInPercentage") {
                                            return (
                                                <StyledTableCell key={idx} align="center">
                                                    {value ? "true" : "false"}
                                                </StyledTableCell>
                                            );
                                        } else {
                                            return (
                                                <StyledTableCell key={idx} align="center">
                                                    {value}
                                                </StyledTableCell>
                                            );
                                        }
                                    }
                                })}
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