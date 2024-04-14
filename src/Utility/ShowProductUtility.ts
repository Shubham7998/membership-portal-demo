import React, { useEffect, useState } from 'react'
import { ProductModel } from '../Models/ProductModel'
import { SnackbarOrigin } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { DeleteUserService, GetAllUserService } from '../Services/UserService';
import { DeleteProductAsync, GetPaginatedProductAsync, GetProductAsync } from '../Services/ProductService';
import { handleSwirl } from '../Generics/Swirl';

export default function ShowProductUtility() {

    const initialValue: ProductModel = {
        id: 0,
        productName: '',
        price: 0
    }

    const [productInfo, setProductInfo] = useState<ProductModel[]>([initialValue]);

    const navigate = useNavigate();



    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const npage = Math.ceil(totalPages / recordsPerPage);
    const numbers = [];
    for (let i = 1; i <= npage; i++) {
        numbers.push(i);
    }

    useEffect(() => {
        fetchData();
    }, [currentPage])

    async function prevPage(e: any) {

        e.preventDefault();
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function prevPageDisabled() : boolean {
        
        return currentPage === 1;
    }
    function nextPageDisabled() : boolean {
        
        return currentPage === npage;
    }

    function nextPage(e: any): void {
        e.preventDefault();
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCurrentPage(id: number, e: any): void {
        e.preventDefault();
        setCurrentPage(id);
    }


    const fetchData = async () => {
        try {

            const result = await GetPaginatedProductAsync(currentPage, recordsPerPage);
            setTotalPages(result.totalPages);
            setProductInfo(result.dataArray);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id: number) {
        const confirmation = await handleSwirl();
        console.log(confirmation.confirmed)
        if (confirmation.confirmed) {
            const result = await DeleteProductAsync(id);
            console.log(result.data);
            fetchData();
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/product/${id}`)
    }
    return { navigate,handleDelete, productInfo, handleEdit, prevPage, nextPage, currentPage, changeCurrentPage, numbers ,prevPageDisabled,nextPageDisabled}
}
