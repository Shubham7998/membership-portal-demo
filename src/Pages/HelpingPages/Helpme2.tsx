import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
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
    data: any[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    dataHeader: string[];
    isSearchMode: boolean;
}

export default function GenericList2({ data, handleDelete, handleEdit, dataHeader, isSearchMode }: GenericListProps) {
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (columnName: string) => {
        if (sortBy === columnName) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnName);
            setSortOrder('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortBy) {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }
        }
        return 0;
    });

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {dataHeader.map((column, index) => (
                            <StyledTableCell key={index} align="left" onClick={() => handleSort(column)}>
                                {column}
                                {sortBy === column && (
                                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                                )}
                            </StyledTableCell>
                        ))}
                        {!isSearchMode && (
                            <>
                                <StyledTableCell align="left">Edit</StyledTableCell>
                                <StyledTableCell align="left">Delete</StyledTableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((item: any, index) => (
                        <StyledTableRow key={index}>
                            {dataHeader.map((column, idx) => (
                                <StyledTableCell key={idx} align="left">
                                    {item[column]}
                                </StyledTableCell>
                            ))}
                            {!isSearchMode && (
                                <>
                                    <StyledTableCell align="left">
                                        <EditIcon onClick={() => handleEdit(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <DeleteIcon onClick={() => handleDelete(item.id)} color="primary" sx={{ cursor: 'pointer' }} />
                                    </StyledTableCell>
                                </>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
