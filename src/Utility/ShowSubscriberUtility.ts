import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel';
import { DeleteSubscriberByIdAsync, GetPaginatedAdvanceSearchSortingSubscriberAsync, GetPaginatedAdvanceSubscriberAsync, GetSubscriberAsync, GetSubscriberSortedAsync } from '../Services/SubscriberService';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';
import { GetAllAsync } from '../Generics/Services/GenericService';

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

    const recordsPerPage = 5;
    const { npage,setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [searchMode, setSearchMode] = useState(false);
    const tableName = 'subscriber';
    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName,currentPage, recordsPerPage, "id", "asc");
        
        if(result != null){
            setSubscriberInfo(result.dataArray);
            setTotalPages(result.totalPages);
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


        const result = await GetAllAsync(searchSubscriberInfo, tableName,currentPage, recordsPerPage, columnName, sortOrder);
        console.log("result")
        console.log(columnName)
        if(result != null){
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
    
        alert("Handle search data")
        alert(JSON.stringify(searchSubscriberInfo));
        const result = await GetAllAsync(searchSubscriberInfo, tableName,currentPage, recordsPerPage, "id", "asc");

        console.log(result)
        setSubscriberInfo(result.dataArray);
        setTotalPages(result.totalPages);
        
      }
    
      const handleSearchClick = () => {
        alert("Handle search cleck")
        searchData();
        setSearchMode(true);
        setIsButtonEnabled(!isButtonEnabled);
        
      };
    // if(currentPage == 1){
    //     displaySnackbar("You are on first page \nPrevious is disabled","error");
    // }else if(currentPage == npage){
    //     displaySnackbar("You are on last page \nPrevious is disabled","error");
    // }

    return {handleSorting, handleDelete, subscriberInfo, handleEdit ,navigate,prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, snackbarOpen,
        handleSnackbarClose,searchSubscriberInfo,
        snackbarMessage,handleClear,setSearchSubscriberInfo,
        snackbarSeverity,handleSearchClick}

}


