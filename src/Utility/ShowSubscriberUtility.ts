import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel';
import { DeleteSubscriberByIdAsync, GetPaginatedAdvanceSubscriberAsync, GetSubscriberAsync, GetSubscriberSortedAsync } from '../Services/SubscriberService';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';

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

    const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel[]>([initialValue]);
    const recordsPerPage = 2;
    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    async function fetchData() {
        const result = await GetPaginatedAdvanceSubscriberAsync(currentPage,recordsPerPage,initialValue);
        if(result){
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
        const result = await GetSubscriberSortedAsync(columnName, sortOrder);

        console.log("result")
        console.log(columnName)
        if(result.data != null){
            setSubscriberInfo(result.data);
        }
    }

    return {handleSorting, handleDelete, subscriberInfo, handleEdit ,navigate,prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, }

}


