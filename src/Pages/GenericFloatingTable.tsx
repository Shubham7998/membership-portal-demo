import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DiscountModel } from '../Models/DiscountModel';
import GenderModel from '../Models/GenderModel';
import { ProductModel } from '../Models/ProductModel';
import { SubscriberModel } from '../Models/SubscriberModel';
import { TaxModel } from '../Models/TaxModel';
import { UserModel } from '../Models/UserModel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}
interface GenericListProps {
    data: UserModel[] | ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    dataHeader: string[],
    isSearchMode: boolean
}
const handleButtons = ["Edit", "Delete"];

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];

export default function GenericFloatingTable({ data, handleDelete, handleEdit, dataHeader, isSearchMode }: GenericListProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        {dataHeader.map((data, index) => (
                            <TableCell key={index} align="left">{data}</TableCell>
                        ))}
                        {!isSearchMode ? handleButtons.map((btn, index) => (
                            <TableCell key={index} align="left">{btn}</TableCell>
                        )) : ""}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item: any, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">
                                {++index}
                            </TableCell>
                            {Object.entries(item).map(([key, value]: any, idx) => (
                                key !== "id" &&
                                <TableCell key={idx} align="left">
                                    {value}
                                </TableCell>
                            ))}
                            {!isSearchMode && (
                                <TableCell align="left">
                                    <EditIcon onClick={() => handleEdit(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                </TableCell>
                            )}
                            {!isSearchMode && (
                                    <TableCell align="left">
                                        <DeleteIcon onClick={() => handleDelete(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                    </TableCell>
                                )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}