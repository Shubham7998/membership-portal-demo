import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel';
import { DeleteSubscriberByIdAsync, GetPaginatedAdvanceSearchSortingSubscriberAsync, GetPaginatedAdvanceSubscriberAsync, GetSubscriberAsync, GetSubscriberSortedAsync } from '../Services/SubscriberService';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';

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

    const [searchSubscriberInfo, setSearchSubscriberInfo] = useState<SubscriberModel[]>([initialValue]);

    const navigate = useNavigate();

    const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel[]>([initialValue]);
    const recordsPerPage = 5;
    const { npage,setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [currentPage])

    async function fetchData() {
        const result = await GetPaginatedAdvanceSearchSortingSubscriberAsync(currentPage,recordsPerPage,"firstName","desc",initialValue);
        
        if(result != null){
            setSubscriberInfo(result.dataArray);
            setTotalPages(result.totalPages);
            setSearchSubscriberInfo(result.dataArray);
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/subscriber/${id}`)
    }
    
    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            console.log("delete data successfullu")
            const result = await DeleteSubscriberByIdAsync(id);
            console.log(result)
            fetchData();
        }
    }

    const handleSorting = async (columnName : string, sortOrder : string) => {
        // const result = await GetSubscriberSortedAsync(columnName, sortOrder);

        const result = await GetPaginatedAdvanceSearchSortingSubscriberAsync(currentPage,recordsPerPage,columnName,sortOrder,initialValue);

        console.log("result")
        console.log(columnName)
        if(result != null){
            setSubscriberInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }

    // if(currentPage == 1){
    //     displaySnackbar("You are on first page \nPrevious is disabled","error");
    // }else if(currentPage == npage){
    //     displaySnackbar("You are on last page \nPrevious is disabled","error");
    // }

    return {handleSorting, handleDelete, subscriberInfo, handleEdit ,navigate,prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, snackbarOpen,
        handleSnackbarClose,searchSubscriberInfo,
        snackbarMessage,
        snackbarSeverity}

}


