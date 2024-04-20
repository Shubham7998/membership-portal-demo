import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import { SubscriberModel } from '../Models/SubscriberModel';
import { GetSubscriberAsync, DeleteSubscriberByIdAsync } from '../Services/SubscriberService';
import { DeleteDiscountAsync, GetDiscountAsync } from '../Services/DiscontService';
import { TaxModel } from '../Models/TaxModel';
import { DeleteTaxAsync, GetTaxAsync } from '../Services/TaxService';
import { GetAllAsync } from '../Generics/Services/GenericService';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';

export default function ShowTaxUtility() {
    const initialValue: TaxModel = {
        id: 0,
        stateName: "",
        sgst: 0,
        cgst: 0,
        totalTax: 0
    }

    const navigate = useNavigate();

    const [taxInfo, setTaxInfo] = useState<TaxModel[]>([initialValue]);
    const [searchTaxInfo, setSearchTaxInfo] = useState<TaxModel>(initialValue);
    const [searchMode, setSearchMode] = useState(false);

    const recordsPerPage = 5;
    const { npage, setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    const tableName = 'tax';

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, "id", "asc");

        if (result != null) {
            setTaxInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }
    const handleSorting = async (columnName: string, sortOrder: string) => {

        alert(columnName + " " + sortOrder);

        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, columnName, sortOrder);
        console.log("result")
        console.log(columnName)
        if (result != null) {
            setTaxInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }
    const handleEdit = (id: number) => {
        navigate(`/tax/${id}`)
    }
    const handleClear = () => {
        setSearchTaxInfo(initialValue);
        fetchData();
    
      };
      async function searchData() {
        // var find = "";
    
        alert("Handle search data")
        alert(JSON.stringify(searchTaxInfo));
        const result = await GetAllAsync(searchTaxInfo, tableName,currentPage, recordsPerPage, "id", "asc");

        console.log(result)
        setTaxInfo(result.dataArray);
        setTotalPages(result.totalPages);
        
      }
      const handleSearchClick = () => {
        alert("Handle search cleck")
        searchData();
        setSearchMode(true);
        
      };
    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            console.log("delete data successfullu")
            const result = await DeleteTaxAsync(id);
            console.log(result)
            fetchData();
        }
    }

    return {handleSearchClick,handleClear,
        prevPage, nextPage, currentPage, changeCurrentPage,
        numbers, prevPageDisabled, handleSorting, setTaxInfo,
        nextPageDisabled, navigate, handleDelete, taxInfo, handleEdit,
        searchTaxInfo, setSearchTaxInfo
    }
}


