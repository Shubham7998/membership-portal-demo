import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../../Models/SubscriberModel';
import { DeleteSubscriberByIdAsync, GetPaginatedAdvanceSearchSortingSubscriberAsync, GetPaginatedAdvanceSubscriberAsync, GetSubscriberAsync, GetSubscriberSortedAsync } from '../../Services/SubscriberService';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../../Generics/Swirl';
import PaginationUtility from '../../Generics/Components/Pagination/PaginationUtility';
import SnackBarGeneric from '../../Generics/Components/Snackbar/SnackBarGeneric';
import { GetAllAsync } from '../../Generics/Services/GenericService';

export default function ShowSubscriberUtility() {
    const initialValue: SubscriberModel = {
        id: 0,
        firstName: '',
        contactNumber: '',
        email: '',
        genderId: -1,
        lastName: '',
        genderName: ''
    }

    const navigate = useNavigate();
    const [searchSubscriberInfo, setSearchSubscriberInfo] = useState<SubscriberModel>(initialValue);
    const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel[]>([initialValue]);

    const recordsPerPage = 3;
    const { npage, setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();
    const [searchMode, setSearchMode] = useState(false);
    const tableName = 'subscriber';
    useEffect(() => {
        fetchData();
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, "id", "asc");

        if (result != null) {
            setSubscriberInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/${tableName}/${id}`)
    }

    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            const result = await DeleteSubscriberByIdAsync(id);
            fetchData();
        }
    }

    const handleSorting = async (columnName: string, sortOrder: string) => {


        const result = await GetAllAsync(searchSubscriberInfo, tableName, currentPage, recordsPerPage, columnName, sortOrder);
        if (result != null) {
            setSubscriberInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }
    const handleClear = () => {
        setSearchSubscriberInfo(initialValue);
        fetchData();

    };

    async function searchData() {
        // var find = "";

        const result = await GetAllAsync(searchSubscriberInfo, tableName, currentPage, recordsPerPage, "id", "asc");

        setSubscriberInfo(result.dataArray);
        setTotalPages(result.totalPages);

    }

    const handleSearchClick = () => {
        alert("Handle search cleck")
        searchData();
        setSearchMode(true);

    };


    return {
        handleSorting, handleDelete, subscriberInfo, handleEdit, navigate, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, snackbarOpen,
        handleSnackbarClose, searchSubscriberInfo, searchMode,
        snackbarMessage, handleClear, setSearchSubscriberInfo,
        snackbarSeverity, handleSearchClick
    }

}


