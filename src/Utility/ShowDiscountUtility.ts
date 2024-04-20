import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import { DeleteDiscountAsync, GetDiscountAsync, GetPaginatedAdvanceDiscountAsync } from '../Services/DiscontService';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';
import { GetAllAsync } from '../Generics/Services/GenericService';

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

    const recordsPerPage = 4;
    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const tableName = "discount";
    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, "id", "asc");

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

    const handleSorting = async (columnName : string, sortOrder : string) => {


        const result = await GetAllAsync(searchDiscountInfo, tableName,currentPage, recordsPerPage, columnName, sortOrder);
        console.log(searchDiscountInfo, tableName,currentPage, recordsPerPage, columnName, sortOrder)
        console.log(columnName)
        if(result != null){
            setDiscountInfo(result.dataArray);
        }
    }
    const handleClear = () => {
        setSearchDiscountInfo(initialValue);
        fetchData();
    
      };

      async function searchData() {
        // var find = "";
    
        alert("Handle search data")
        alert(JSON.stringify(searchDiscountInfo));
        const result = await GetAllAsync(searchDiscountInfo, tableName,currentPage, recordsPerPage, "id", "asc");

        console.log(result)
        setDiscountInfo(result.dataArray);
        setTotalPages(result.totalPages);
        
      }
    
      const handleSearchClick = () => {
        alert("Handle search cleck")
        searchData();
        
      };

    return { handleDelete, discountInfo, handleEdit,
         navigate, prevPage, nextPage, currentPage, 
         changeCurrentPage, numbers, prevPageDisabled,
          nextPageDisabled, handleSearchClick,handleClear,
          searchDiscountInfo,handleSorting,
        setSearchDiscountInfo}
}



