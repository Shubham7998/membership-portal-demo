import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SubscriptionModel } from '../Models/SubscriptionModel';
import { DeleteSubscriptionAsync, GetSubscriptionAsync } from '../Services/SubscriptionService';
import { handleSwirl } from '../Generics/Swirl';
import { DeleteSubscriberByIdAsync } from '../Services/SubscriberService';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';
import { GetAllAsync } from '../Generics/Services/GenericService';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function () {

    const apiEndpointFormat = "2024-04-21T10:01:08.791Z";
    const timestamp = new Date(apiEndpointFormat);

    const formattedStartDate = `${(timestamp.getDate() < 10 ? '0' : '') + timestamp.getDate()}-${(timestamp.getMonth() < 9 ? '0' : '') + (timestamp.getMonth() + 1)}-${timestamp.getFullYear()}`;

    // Assuming you have received DateOnly dates as strings from the backend API
    const apiStartDate = "2024-01-04"; // Example DateOnly format from backend API
    const apiExpiryDate = "2024-01-04"; // Example DateOnly format from backend API

    const initialValueSubscription: SubscriptionModel = {
        id: 0,
        subscriberId: 0,
        productId: 0,
        productName : "",
        productPrice : 0,
        discountId: 0,
        discountCode : "",
        discountAmount : 0,
        startDate : undefined,
        expiryDate : undefined,
        priceAfterDiscount: 0,
        taxId: 0,
        cgst: 0,
        sgst: 0,
        totalTaxPercent: 0,
        taxAmount: 0,
        finalAmount: 0
    };

    console.log(initialValueSubscription);


    console.log(formattedStartDate);

    const [searchMode, setSearchMode] = useState(false);

    const [searchSubscriptionInfo, setSearchSubscriptionInfo] = useState<SubscriptionModel>(initialValueSubscription);
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionModel[]>([initialValueSubscription])

    const recordsPerPage = 2;
    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const tableName = "subscription";
    const navigate = useNavigate();
    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();

    useEffect(() => {

        fetchData(searchSubscriptionInfo);
    }, [currentPage])

    const fetchData = async (data: SubscriptionModel) => {
        
        const result = await GetAllAsync(data, tableName, currentPage, recordsPerPage, "id", "asc");
        if (true) {
            setSubscriptionInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/${tableName}/${id}`)
    }


    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            console.log(" data deleted successfullu")
            const result = await DeleteSubscriptionAsync(id);
            console.log(result)
            fetchData(initialValueSubscription);
        }
    }

    const handleClear = () => {
        setSearchSubscriptionInfo(initialValueSubscription);
        fetchData(initialValueSubscription);

    }

    const handleSorting = async (columnName: string, sortOrder: string) => {


        const result = await GetAllAsync(searchSubscriptionInfo, tableName, currentPage, recordsPerPage, columnName, sortOrder);
        console.log("result")
        console.log(columnName)
        if (result != null) {
            setSubscriptionInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }

    async function searchData() {
        // var find = "";

        alert("Handle search data")
        alert(JSON.stringify(searchSubscriptionInfo));
        const result = await GetAllAsync(searchSubscriptionInfo, tableName, currentPage, recordsPerPage, "id", "asc");

        console.log(result)
        setSubscriptionInfo(result.dataArray);
        setTotalPages(result.totalPages);

    }

    const handleSearchClick = () => {
        alert("Handle search cleck")
        searchData();
        setSearchMode(true);

    };

    return {
        handleSorting, handleDelete, subscriptionInfo, handleEdit, navigate, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, snackbarOpen,
        handleSnackbarClose, searchSubscriptionInfo, searchMode,
        snackbarMessage, handleClear, setSearchSubscriptionInfo,
        snackbarSeverity, handleSearchClick
    }
}
