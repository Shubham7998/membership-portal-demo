import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ShowProductUtility from '../../Utility/ShowProductUtility';
import SideNav from './SideNav';
import GenericList from '../GenericList';
import AddButton from '../../Generics/Components/Buttons/AddButton';
import PaginationComponent from '../../Generics/Components/Pagination/PaginationComponent';
import GenericList2 from './Helpme2';
import { ProductModel } from '../../Models/ProductModel';
import GenericButton from '../../Generics/Components/Buttons/ButtonGeneric';
import OnChangeFields from '../../Generics/OnChangeFields';

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
  const productDataHeader = ["Product Name", "Product Price"]

  const { handleSearchClick,handleClear,handleSorting,setSearchProductInfo,searchProductInfo,handleSelectChange, navigate, handleDelete, productInfo, handleEdit, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, removeDuplicates } = ShowProductUtility();
  const sortColumn = ["productName", "price"];
  const {
    onTextFieldChange,

  } = OnChangeFields();
  console.log(productInfo)
  return (
    <>
      <Box height={30} />
      <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
        <SideNav />
        <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
          <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Product List</h1>
          <Grid container spacing={3} sx={{marginBottom : 3}}>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel id="productName">Select Product</InputLabel>
                <Select
                  fullWidth
                  required
                  size='small'
                  labelId="productName"
                  id="productName"
                  name="productName"
                  label="Select Product"
                  value={searchProductInfo.productName}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={""}>Select Product </MenuItem>
                  {productInfo.map(
                    (data: ProductModel) => (
                      <MenuItem key={data.id} value={data.productName}>
                        {data.productName}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                id="price"
                name="price"
                size='small'
                label="Price "
                variant="outlined"
                autoComplete="off"
                value={searchProductInfo.price}
                onChange={(e) =>
                  onTextFieldChange(
                    e,
                    setSearchProductInfo
                  )
                }
                inputProps={{ maxLength: 6 }}
              />
            </Grid>
            <Grid item xs={2}>
              <GenericButton btnName='Search' handleSubmit={handleSearchClick} />
            </Grid>
            <Grid item xs={2}>
              <GenericButton btnName='Clear' handleSubmit={handleClear} />
            </Grid>
            <Grid item xs={4}>
              <AddButton path={"/user"} />
            </Grid>
          </Grid>
          <GenericList data={productInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={productDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
          <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
        </Box>
      </Box>
    </>
  );
}
