import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import { DeleteDiscountAsync, GetDiscountAsync, GetPaginatedAdvanceDiscountAsync } from '../Services/DiscontService';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';

export default function ShowDiscountUtility() {
    const initialValue: DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }

    const navigate = useNavigate();

    const [discountInfo, setDiscountInfo] = useState<DiscountModel[]>([initialValue])
    const recordsPerPage = 4;
    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [currentPage])

    async function fetchData() {

        const result = await GetPaginatedAdvanceDiscountAsync(currentPage, recordsPerPage, initialValue);
        if (result != null) {
            setTotalPages(result.totalPages);
            setDiscountInfo(result.dataArray);
        }

        console.log(discountInfo)
    }

    const handleEdit = (id: number) => {
        navigate(`/discount/${id}`)
    }

    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            console.log("delete data successfullu")
            const result = await DeleteDiscountAsync(id);
            console.log(result)
            fetchData();
        }
    }

<<<<<<< HEAD
    return { handleDelete, discountInfo, handleEdit,navigate,prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled,  }
    
=======
    return { handleDelete, discountInfo, handleEdit, navigate, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, }
>>>>>>> 1f98b1a4779b94c1ae2f745293d17ec89d989b7c
}



