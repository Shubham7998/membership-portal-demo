import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SubscriptionModel } from '../Models/SubscriptionModel';
import { DeleteSubscriptionAsync, GetSubscriptionAsync } from '../Services/SubscriptionService';
import { handleSwirl } from '../Generics/Swirl';
import { DeleteSubscriberByIdAsync } from '../Services/SubscriberService';

export default function () {
    const initialValueSubscription: SubscriptionModel = {
        id: 0,
        subscriberId: 0,
        productId: 0,
        discountId: 0,
        startDate: undefined,
        expiryDate: undefined,
        priceAfterDiscount: 0,
        taxId: 2,
        cgst: 0,
        sgst: 0,
        totalTaxPercent: 0,
        taxAmount: 0,
        finalAmount: 0
    }

    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionModel[]>([initialValueSubscription])
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    const fetchData = async () => {
        const result = await GetSubscriptionAsync();
        setSubscriptionInfo(result.data);
        console.log(result)
    }

    const handleEdit = (id: number) => {
        navigate(`/subscription/${id}`)
    }
    
    const handleDelete = async (id: number) => {
        const confirmation = await handleSwirl();
        if (confirmation.confirmed) {
            console.log(" data deleted successfullu")
            const result = await DeleteSubscriptionAsync(id);
            console.log(result)
            fetchData();
        }
    }

    return {navigate,subscriptionInfo, handleEdit, handleDelete}
}
