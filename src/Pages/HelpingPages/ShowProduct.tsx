import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {
  Alert, Box, Button, ButtonGroup, Snackbar, Grid, TextField, InputLabel, Select,
  MenuItem, FormControl
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetPaginatedProductAsync, GetProductAsync } from '../../Services/ProductService';
import ShowProductUtility from '../../Utility/ShowProductUtility';
import SideNav from './SideNav';
import { Theme } from '@mui/material/styles';
import GenericList from '../GenericList';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
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


export default function ShowProduct() {
  const productDataHeader = ["Sr. No.", "Product Name", "Product Price"]

  const { removeDuplicates, handleDelete, productInfo, productInfoSearch, handleEdit, prevPage, nextPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, navigate, handleSelectChange } = ShowProductUtility();
  return (
    <>
      <Box height={30} />
      <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
        <SideNav />
        <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
          <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Product List</h1>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>

            <Grid item xs={12} sx={{ marginRight: 5 }}>
              <FormControl fullWidth >
                <InputLabel id="productName">Product Name</InputLabel>
                <Select
                  style={{ height: 40 }}
                  labelId="productName"
                  id="productName"
                  value={productInfoSearch.productName.toString()} 
                  label="Product Name"
                  name='productName'
                  required
                  onChange={handleSelectChange}
                >
                  <MenuItem value={""} >---Select Product Name---</MenuItem>
                  {productInfo?.map((product) => (
                    <MenuItem key={product.id} value={product.id}>{product.productName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginRight: 5 }}>
              <FormControl fullWidth >
                <InputLabel id="price">Product Price</InputLabel>
                <Select
                  style={{ height: 40 }}
                  labelId="price"
                  id="price"
                  value={productInfoSearch.price.toString()}
                  label="Product Price"
                  name='price'
                  required
                  onChange={handleSelectChange}
                >
                  <MenuItem value={0}>---Select Product Price---</MenuItem>
                  {productInfo?.map((product, key) => (
                    <MenuItem key={product.id} value={product.id}>{product.price}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginRight: 5 }}>
              <Button size="small"
                variant="contained"
                color="primary"
                sx={{ padding: 1 }}
              ><SearchIcon /> Search</Button>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexGrow: 1 }}>

              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => navigate("/product")}
                style={{ alignItems: "right" }}
              >
                Add <AddCircleOutlineRoundedIcon />
              </Button>
            </Box>

          </div>
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Sr no</StyledTableCell>
                  <StyledTableCell align="center">Product Name</StyledTableCell>
                  <StyledTableCell align="center">Product Price</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {productInfo?.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{data.id}</StyledTableCell>
                    <StyledTableCell align="center">{data.productName}</StyledTableCell>
                    <StyledTableCell align="center">{data.price}</StyledTableCell>
                    <StyledTableCell align="center" onClick={() => handleEdit(data.id)}><EditIcon color="primary" sx={{ cursor: 'pointer', alignItems: 'left' }} /></StyledTableCell>
                    <StyledTableCell align="center" onClick={() => handleDelete(data.id)}><DeleteIcon color="primary" sx={{ cursor: 'pointer' }} /></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          <GenericList data={productInfo} dataHeader={productDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <ButtonGroup color="primary" aria-label="navigation">
              <Button onClick={(e) => prevPage(e)} disabled={prevPageDisabled()} sx={{
                // '&:disabled': {
                //   backgroundColor: 'grey',
                //   color: 'primary',
                //   // border : 1 
                // },
              }}>Prev</Button>

              {
                numbers.map((n, i) => (
                  <Button key={i} onClick={(e) => changeCurrentPage(n, e)}>{n}</Button>
                ))
              }
              <Button onClick={(e) => nextPage(e)} disabled={nextPageDisabled()}>Next</Button>
            </ButtonGroup>
          </div>
        </Box>
      </Box>
    </>
  );
}
