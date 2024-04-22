import React, { useEffect, useState } from 'react'
import GenderModel from '../../Models/GenderModel';
import { useNavigate } from 'react-router-dom';
import PaginationUtility from '../../Generics/Components/Pagination/PaginationUtility';
import { DeleteInfoById, GetAllAsync } from '../../Generics/Services/GenericService';
import { handleSwirl } from '../../Generics/Swirl';
import { DeleteUserService } from '../../Services/UserService';

export default function ShowGenderUtility() {

    const initialValue: GenderModel = {
        id: 0,
        genderName: ""
    };
    const [genderInfo, setGenderInfo] = useState<GenderModel[]>([initialValue]);

    const navigate = useNavigate();
    const recordsPerPage = 2;

    const { setTotalPages, changeCurrentPage, nextPage, prevPageDisabled, nextPageDisabled, prevPage, numbers, currentPage } = PaginationUtility(recordsPerPage);
    const tableName = 'gender';

    useEffect(() => {
        fetchData();
    }, [currentPage])

    async function fetchData() {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, "id", "asc");

        if (result != null) {
            setGenderInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }

    async function handleDelete(id: number) {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            const result = await DeleteInfoById(tableName, id);
            fetchData();
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/gender/${id}`)
    }

    const handleSorting = async (columnName: string, sortOrder: string) => {
        const result = await GetAllAsync(initialValue, tableName, currentPage, recordsPerPage, columnName, sortOrder);

        if (result != null) {
            setGenderInfo(result.dataArray);
            setTotalPages(result.totalPages);
        }
    }


    return {
        handleDelete, genderInfo,
        handleEdit, navigate, handleSorting,
        setGenderInfo
        , prevPage, nextPage, currentPage, changeCurrentPage,
        numbers, prevPageDisabled,
        nextPageDisabled
    }
}
