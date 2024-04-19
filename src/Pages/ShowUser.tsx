import { Box, Button } from '@mui/material';
import SideNav from './HelpingPages/SideNav';
import ShowUserUtility from '../Utility/ShowUserUtility';
import GenericList from './GenericList';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddButton from '../Generics/Components/Buttons/AddButton';

export default function ShowUser() {

    const { handleDelete, userInfo, handleEdit, navigate } = ShowUserUtility();

    ShowAlert();
    function ShowAlert() {
        console.log("data-show")
        console.log(userInfo)
    }

    const userDataHeader = ["First Name", "Last Name", "Email", "Password", "Contact No."]


    return (
        <>

            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>User List</h1>
                    <AddButton path={"/user"} />
                    <GenericList data={userInfo} dataHeader={userDataHeader} handleEdit={handleEdit} handleDelete={handleDelete} isSearchMode={false} />
                </Box>
            </Box>
        </>
    );
}


{/* <Box height={30} />
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
            </Box> */}