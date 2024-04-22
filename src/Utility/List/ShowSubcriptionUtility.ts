import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SubscriptionModel } from '../../Models/SubscriptionModel';
import { DeleteSubscriptionAsync } from '../../Services/SubscriptionService';
import { handleSwirl } from '../../Generics/Swirl';
import { GetSubscriberAsync } from '../../Services/SubscriberService';
import PaginationUtility from '../../Generics/Components/Pagination/PaginationUtility';
import { GetAllAsync } from '../../Generics/Services/GenericService';
import SnackBarGeneric from '../../Generics/Components/Snackbar/SnackBarGeneric';
import { DiscountModel } from '../../Models/DiscountModel';
import { ProductModel } from '../../Models/ProductModel';
import { SubscriberModel } from '../../Models/SubscriberModel';
import { GetDiscountAsync } from '../../Services/DiscontService';
import { GetProductAsync } from '../../Services/ProductService';
import { subscribe } from 'diagnostics_channel';

export default function () {


    const initialValueSubscriber: SubscriberModel = {
        id: 0,
        firstName: '',
        contactNumber: '',
        email: '',
        genderId: -1,
        lastName: ''
    }
    const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel[]>([initialValueSubscriber]);

    const initialValueProduct: ProductModel = {
        id: 0,
        productName: '',
        price: 0
    }

    const [productInfo, setProductInfo] = useState<ProductModel[]>([initialValueProduct]);

    const initialValueDiscount: DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }
    const [discountInfo, setDiscountInfo] = useState<DiscountModel[]>([initialValueDiscount]);

    const initialValueSubscription: SubscriptionModel = {
        id: 0,
        subscriberName: "",
        subscriberId: 0,
        productId: 0,
        productName: "",
        productPrice: 0,
        discountId: 0,
        discountCode: "",
        discountAmount: 0,
        startDate: undefined,
        expiryDate: undefined,
        priceAfterDiscount: 0,
        taxId: 0,
        cgst: 0,
        sgst: 0,
        totalTaxPercent: 0,
        taxAmount: 0,
        finalAmount: 0
    };


    const [searchMode, setSearchMode] = useState(false);
    const [name, setName] = useState("");
    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionModel[]>([initialValueSubscription])
    const [searchSubscriptionInfo, setSearchSubscriptionInfo] = useState<SubscriptionModel>(initialValueSubscription);

    const recordsPerPage = 3;
    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const tableName = "subscription";
    const navigate = useNavigate();
    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const fetchData = async () => {
        const fetchSubscriberInfo = await GetSubscriberAsync();
        if (fetchSubscriberInfo != null) {
            setSubscriberInfo(fetchSubscriberInfo.data);

        }
        const fetchProductInfo = await GetProductAsync();
        if (fetchProductInfo != null) {
            setProductInfo(fetchProductInfo.data);
        }

        const fetchDiscountInfo = await GetDiscountAsync();

        if (fetchDiscountInfo != null) {
            setDiscountInfo(fetchDiscountInfo.data);
        }
        const result = await GetAllAsync(searchSubscriptionInfo, tableName, currentPage, recordsPerPage, "id", "asc");
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
            const result = await DeleteSubscriptionAsync(id);
            fetchData();
        }
    }

    const handleClear = () => {
        setSearchSubscriptionInfo(initialValueSubscription);
        fetchData();
        setSearchMode(false)
    }


    const handleSorting = async (columnName: string, sortOrder: string) => {
        const result = await GetAllAsync(searchSubscriptionInfo, tableName, currentPage, recordsPerPage, columnName, sortOrder);
        if (result != null) {
            setSubscriptionInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }

    async function searchData() {

        const result = await GetAllAsync(searchSubscriptionInfo, tableName, 1, recordsPerPage, "id", "asc");

        setSubscriptionInfo(result.dataArray);
        setTotalPages(result.totalPages);

    }

    const handleSearchClick = () => {
        searchData();
        setSearchMode(true);

    };

    return {
        handleSorting, handleDelete, subscriptionInfo, handleEdit, navigate, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, snackbarOpen,
        handleSnackbarClose, searchSubscriptionInfo, searchMode,
        snackbarMessage, handleClear, setSearchSubscriptionInfo,
        snackbarSeverity, handleSearchClick, subscriberInfo, discountInfo, productInfo
    }
}
