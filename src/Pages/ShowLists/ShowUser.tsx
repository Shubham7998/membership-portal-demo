import { Box, Button, Grid, TextField } from '@mui/material';
import SideNav from '../HelpingPages/SideNav';
import ShowUserUtility from '../../Utility/ShowUserUtility';
import GenericList from './GenericList';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddButton from '../../Generics/Components/Buttons/AddButton';
import OnChangeFields from '../../Generics/OnChangeFields';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GenericButton from '../../Generics/Components/Buttons/ButtonGeneric';
import PaginationComponent from '../../Generics/Components/Pagination/PaginationComponent';

export default function ShowUser() {

    const { handleDelete, userInfo,
        handleEdit, navigate, handleSorting,
        setUserInfo, searchUserInfo,
        prevPage, nextPage, currentPage, changeCurrentPage,
        numbers, prevPageDisabled,
        nextPageDisabled,
        handleSearchClick, handleClear
        , setSearchUserInfo } = ShowUserUtility();

    ShowAlert();
    function ShowAlert() {
        console.log("data-show")
        console.log(userInfo)
    }

    const userDataHeader = ["First Name", "Last Name", "Email", "Password", "Contact No."]
    const sortColumn = ["firstName", "lastName", "contactNumber", "email", "password", "contactNumber"];
    const {
        onTextFieldChange,

    } = OnChangeFields();

    return (
        <>

            <Box height={30} />
            <Box sx={{ display: 'flex', flexDirection: 'horizontal', alignContent: 'center' }}>
                <SideNav />
                <Box component="main" sx={{ margin: 3, flexGrow: 1, p: 3 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>User List</h1>
                    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                size='small'
                                autoComplete="off"
                                //InputLabelProps={{ shrink: userUtility.UserInfo.firstName !==""? true:false }}
                                inputProps={{ maxLength: 50 }}
                                value={searchUserInfo.firstName}
                                onChange={(e) =>
                                    onTextFieldChange(e, setSearchUserInfo)
                                }

                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                size='small'
                                autoComplete="off"
                                value={searchUserInfo.lastName || ""}
                                onChange={(e) =>
                                    onTextFieldChange(e, setSearchUserInfo)
                                }
                                inputProps={{ maxLength: 50 }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                size='small'
                                label="Email Address"
                                variant="outlined"
                                autoComplete="off"
                                value={searchUserInfo.email}
                                onChange={(e) =>
                                    onTextFieldChange(e, setSearchUserInfo)
                                }
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                id="contactNumber"
                                name="contactNumber"
                                label="Mobile No"
                                size='small'
                                variant="outlined"
                                value={searchUserInfo.contactNumber}
                                onChange={(e) =>
                                    onTextFieldChange(e, setSearchUserInfo)
                                }
                                inputProps={{ maxLength: 10 }}
                            />
                        </Grid>

                        <Grid item xs={1.2}>
                            <GenericButton btnName='Search' handleSubmit={handleSearchClick} />
                        </Grid>
                        <Grid item xs={1.2}>
                            <GenericButton btnName='Clear' handleSubmit={handleClear} />
                        </Grid>
                        <Grid item xs={1.6}>
                            <AddButton path={"/user"} />
                        </Grid>
                    </Grid>
                    <GenericList data={userInfo} handleDelete={handleDelete} handleEdit={handleEdit} isSearchMode={false} dataHeader={userDataHeader} tableName={sortColumn} handleSorting={handleSorting} />
                    <PaginationComponent numbers={numbers} prevPage={prevPage} prevPageDisabled={prevPageDisabled} changeCurrentPage={changeCurrentPage} nextPage={nextPage} nextPageDisabled={nextPageDisabled} />

                </Box>
            </Box>
        </>
    );
}
