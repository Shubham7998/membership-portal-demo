import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../../Models/DiscountModel';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../../Generics/Swirl';
import { DeleteDiscountAsync, GetDiscountAsync, GetPaginatedAdvanceDiscountAsync } from '../../Services/DiscontService';
import PaginationUtility from '../../Generics/Components/Pagination/PaginationUtility';
import { GetAllAsync } from '../../Generics/Services/GenericService';

export default function ShowDiscountUtility() {
    const initialValue: DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }

    const navigate = useNavigate();

    const [discountInfo, setDiscountInfo] = useState<DiscountModel[]>([initialValue])
    const [searchDiscountInfo, setSearchDiscountInfo] = useState<DiscountModel>(initialValue);
    const [searchMode, setSearchMode ] = useState(false);

    const recordsPerPage = 4;
    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const tableName = "discount";
    useEffect(() => {
        fetchData();
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, "id", "asc");

        if (result != null) {
            setTotalPages(result.totalPages);
            setDiscountInfo(result.dataArray);
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/discount/${id}`)
    }

    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            const result = await DeleteDiscountAsync(id);
            fetchData();
        }
    }

    const handleSorting = async (columnName: string, sortOrder: string) => {


        const result = await GetAllAsync(searchDiscountInfo, tableName, currentPage, recordsPerPage, columnName, sortOrder);
        if (result != null) {
            setDiscountInfo(result.dataArray);
        }
        setSearchMode(true);

    }
    const handleClear = () => {
        setSearchDiscountInfo(initialValue);
        fetchData();
        setSearchMode(false);

    };

    async function searchData() {

        const result = await GetAllAsync(searchDiscountInfo, tableName, 1, recordsPerPage, "id", "asc");

        setDiscountInfo(result.dataArray);
        setTotalPages(result.totalPages);

    }

    const handleSearchClick = () => {
        searchData();
        setSearchMode(true);

    };

    return {
        handleDelete, discountInfo, handleEdit,
        navigate, prevPage, nextPage, currentPage,
        changeCurrentPage, numbers, prevPageDisabled,
        nextPageDisabled, handleSearchClick, handleClear,
        searchDiscountInfo, handleSorting,
        setSearchDiscountInfo,searchMode
    }
}



