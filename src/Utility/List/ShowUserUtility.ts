import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../../Models/UserModel';
import { GetAllUserService, DeleteUserService } from '../../Services/UserService';
import Swal from 'sweetalert2';
import { handleSwirl } from '../../Generics/Swirl';
import PaginationUtility from '../../Generics/Components/Pagination/PaginationUtility';
import SnackBarGeneric from '../../Generics/Components/Snackbar/SnackBarGeneric';
import { GetAllAsync } from '../../Generics/Services/GenericService';

export default function ShowUserUtility() {


    const initialValue: UserModel = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: ''
    }

    const [userInfo, setUserInfo] = useState<UserModel[]>([initialValue]);

    const [searchUserInfo, setSearchUserInfo] = useState<UserModel>(initialValue);

    const navigate = useNavigate();

    const recordsPerPage = 5;
    const { npage, setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [searchMode, setSearchMode] = useState(false);
    const tableName = 'user';

    useEffect(() => {
        fetchData();
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, "id", "asc");

        if (result != null) {
            setUserInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }


    async function handleDelete(id: number) {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            const result = await DeleteUserService(id);
            fetchData();
            setSearchMode(false);
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/user/${id}`)
    }
    const handleSorting = async (columnName: string, sortOrder: string) => {


        const result = await GetAllAsync(searchUserInfo, tableName, currentPage, recordsPerPage, columnName, sortOrder);
        if (result != null) {
            setUserInfo(result.dataArray);
            setTotalPages(result.totalPages);
            setSearchMode(false);

        }
    }
    const handleClear = () => {
        setSearchUserInfo(initialValue);
        fetchData();

    };

    async function searchData() {
        const result = await GetAllAsync(searchUserInfo, tableName, currentPage, recordsPerPage, "id", "asc");
        setUserInfo(result.dataArray);
        setTotalPages(result.totalPages);

    }

    const handleSearchClick = () => {
        searchData();
        setSearchMode(true);
        setIsButtonEnabled(!isButtonEnabled);

    };
    return {
        handleDelete, userInfo,
        handleEdit, navigate, handleSorting,
        setUserInfo, searchUserInfo,
        handleSearchClick, handleClear
        , setSearchUserInfo, searchMode,
        prevPage, nextPage, currentPage, changeCurrentPage,
        numbers, prevPageDisabled,
        nextPageDisabled
    }
}
