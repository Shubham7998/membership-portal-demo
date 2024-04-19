import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, 
} from "@mui/material";
import ShowProductUtility from '../../Utility/ShowProductUtility';
import SideNav from './SideNav';
import GenericList from '../GenericList';
import AddButton from '../../Generics/Components/Buttons/AddButton';
import PaginationComponent from '../../Generics/Components/Pagination/PaginationComponent';

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

  console.log(productInfo)
  return (
    <>
      <Box height={30} />
      <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
        <SideNav />
        <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
          <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>Product List</h1>
          <AddButton path={"/product"} />
          <GenericList data={productInfo} dataHeader={productDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
          <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />
        </Box>
      </Box>
    </>
  );
}
