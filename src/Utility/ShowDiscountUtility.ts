import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import { DeleteDiscountAsync, GetDiscountAsync } from '../Services/DiscontService';

export default function ShowDiscountUtility() {
    const initialValue : DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }

    const navigate = useNavigate();

    const [discountInfo, setDiscountInfo] = useState<DiscountModel[]>([initialValue])

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    async function fetchData() {
        const result = await GetDiscountAsync();
        setDiscountInfo(result.data);
        console.log(result);
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

    return { handleDelete, discountInfo, handleEdit,navigate }
}


