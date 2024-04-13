import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel';
import { DeleteSubscriberByIdAsync, GetSubscriberAsync } from '../Services/SubscriberService';
import { useNavigate } from 'react-router-dom';

export default function ShowSubscriberUtility() {
    const initialValue: SubscriberModel = {
        id: 0,
        firstName: '',
        contactNumber: '',
        email: '',
        genderId: -1,
        lastName: ''
    }

    const navigate = useNavigate();

    const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel[]>([initialValue]);

    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    async function fetchData() {
        const result = await GetSubscriberAsync();
        setSubscriberInfo(result.data);
        console.log(result);
    }

    const handleEdit = (id : number) => {
        navigate(`/subscriber/${id}`)
    }

    const handleDelete = async (id : number) => {
        const confirmation = window.confirm("Are you sure ? ");

        if(confirmation){
            console.log("delete data successfullu")
            const result = await DeleteSubscriberByIdAsync(id);
            console.log(result)
            fetchData();
        }
    }

    return {handleDelete, subscriberInfo, handleEdit}

}


