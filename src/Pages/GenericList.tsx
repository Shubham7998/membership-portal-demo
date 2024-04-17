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


const userDataHeader = ["Sr. No.", "First Name", "Last Name", "Email", "Contact No."]
const subscriberDataHeader = ["Sr. No.", "First Name", "Last Name", "Email", "Contact No.", "Gender"]
const productDataHeader = ["Sr. No.", "Product Name", "Product Price"]
const discountDataHeader = ["Sr. No.", "Discount Code", "Discount Amount", "IsDiscountInPercentage"]
const taxDataHeader = ["Sr. No.", "SGST", "CGST", "Total Tax"]
const genderDataHeader = ["Sr. No.", "Gender"];
const subscriptionDataHeader = ["Sr. No.", "Subscriber Id","Product Id", "Product Name",
    "Product Price", "Discount Id", "Discount Id", "Discount Amount", "Start Date", 
    "Expiry Date", "Price After Discount", "Tax Id", "CGST%", "SGST%", "Total tax Percent",
    "Tax Amount", "Final Amount"
];

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
    isSearchMode: boolean
}
export default function GenericList({ data, handleDelete, handleEdit, dataHeader, isSearchMode }: GenericListProps) {

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <caption>A basic table example with a caption</caption>
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
                                <StyledTableCell align="left">
                                    {++index}
                                </StyledTableCell>
                                {Object.entries(item).map(([key, value] : any, idx) => (
                                    key !== "id" && 
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
