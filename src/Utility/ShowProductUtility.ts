import React, { useEffect, useState } from 'react'
import { ProductModel } from '../Models/ProductModel'
import { SelectChangeEvent, SnackbarOrigin } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdvanceSearchProductAsync, DeleteProductAsync, GetPaginatedAdvanceProductAsync, GetPaginatedProductAsync, GetProductAsync, SearchProductAsync } from '../Services/ProductService';
import { handleSwirl } from '../Generics/Swirl';
import PaginationUtility from '../Generics/Components/Pagination/PaginationUtility';
import { GetAllAsync } from '../Generics/Services/GenericService';

export default function ShowProductUtility() {

    const initialValue: ProductModel = {
        id: 0,
        productName: "",
        price: 0
    }

    const [searchProductInfo, setSearchProductInfo] = useState<ProductModel>(initialValue);
    const [productInfo, setProductInfo] = useState<ProductModel[]>([initialValue]);
    const tableName = 'product';
    const [searchMode, setSearchMode] = useState(false);

    const removeDuplicates = (products: ProductModel[]): ProductModel[] => {
        const uniqueProducts: ProductModel[] = [];
        products.forEach((product) => {
            if (!uniqueProducts.some((p) => p.productName === product.productName && p.price === product.price)) {
                uniqueProducts.push(product);
            }
        });
        console.log("uniqueProducts")
        console.log(uniqueProducts)
        return uniqueProducts;
    };

    const navigate = useNavigate();

    const handleSelectChange = async (
        event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setSearchProductInfo((prevState) => ({ ...prevState, [name]: value }));
        searchData();
    };
    async function searchData() {
    
        alert("Handle search data")
        alert(JSON.stringify(searchProductInfo));
        const result = await GetAllAsync(searchProductInfo, tableName,currentPage, recordsPerPage, "id", "asc");

        console.log(result)
        setProductInfo(result.dataArray);
        setTotalPages(result.totalPages);
        
      }

    const recordsPerPage = 12;


    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);

    useEffect(() => {
        fetchData();
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName,currentPage, recordsPerPage, "id", "asc");
        
        if(result != null){
            setProductInfo(result.dataArray);
            setTotalPages(result.totalPages);
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

    const handleSorting = async (columnName : string, sortOrder : string) => {


        const result = await GetAllAsync(searchProductInfo, tableName,currentPage, recordsPerPage, columnName, sortOrder);
        console.log("result")
        console.log(columnName)
        if(result != null){
            setProductInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }
    const handleClear = () => {
        setSearchProductInfo(initialValue);
        fetchData();
    
      };

      
    
      const handleSearchClick = () => {
        alert("Handle search cleck")
        searchData();
        setSearchMode(true);
        
      };
    return { handleSearchClick,handleClear,handleSorting,setSearchProductInfo,searchProductInfo,handleSelectChange, navigate, handleDelete, productInfo, handleEdit, prevPage, nextPage, currentPage, changeCurrentPage, numbers, prevPageDisabled, nextPageDisabled, removeDuplicates }
}
