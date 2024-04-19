import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import { SubscriberModel } from '../Models/SubscriberModel';
import { GetSubscriberAsync, DeleteSubscriberByIdAsync } from '../Services/SubscriberService';
import { DeleteDiscountAsync, GetDiscountAsync } from '../Services/DiscontService';
import { TaxModel } from '../Models/TaxModel';
import { DeleteTaxAsync, GetTaxAsync } from '../Services/TaxService';

export default function ShowTaxUtility() {
    const initialValue : TaxModel = {
        id: 0,
        stateName : "",
        sgst: 0,
        cgst: 0,
        totalTax : 0
    }

    const navigate = useNavigate();

    const [taxInfo, setTaxInfo] = useState<TaxModel[]>([initialValue])

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    async function fetchData() {
        const result = await GetTaxAsync();
        setTaxInfo(result.data);
        console.log(result);
    }

    const handleEdit = (id: number) => {
        navigate(`/tax/${id}`)
    }
    
    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            console.log("delete data successfullu")
            const result = await DeleteTaxAsync(id);
            console.log(result)
            fetchData();
        }
    }

    return { navigate,handleDelete, taxInfo, handleEdit }
}


