import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel';
import { DeleteSubscriberByIdAsync, GetSubscriberAsync } from '../Services/SubscriberService';
import { useNavigate } from 'react-router-dom';
import { handleSwirl } from '../Generics/Swirl';
import { ProductModel } from '../Models/ProductModel';
import { DiscountModel } from '../Models/DiscountModel';
import { SubscriptionModel } from '../Models/SubscriptionModel';
import { GetProductAsync } from '../Services/ProductService';
import { GetDiscountAsync } from '../Services/DiscontService';
import dayjs, { Dayjs } from 'dayjs';
import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    SelectChangeEvent,
    SnackbarOrigin,
} from "@mui/material";
import { CreateSubscriptionAsync, GetSubscriptionByIdAsync, UpdateSubscriptionAsync } from '../Services/SubscriptionService';

export default function SubscriptionUtility(id: number) {
    type DateFieldChangeHandler = (name: string, value: Dayjs | null) => void;

    const initialValueSubscriber: SubscriberModel = {
        id: 0,
        firstName: '',
        contactNumber: '',
        email: '',
        genderId: -1,
        lastName: ''
    }
    const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel[]>([initialValueSubscriber]);

    const initialValueProduct: ProductModel = {
        id: 0,
        productName: '',
        price: 0
    }

    const [productInfo, setProductInfo] = useState<ProductModel[]>([initialValueProduct]);

    const initialValueDiscount: DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }
    const [discountInfo, setDiscountInfo] = useState<DiscountModel[]>([initialValueDiscount]);

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // This format is compatible with DateOnly in C#
    }

    // Usage in your code
    //   const startDateToSend = formatDate(startDate); // Adjust startDate to your actual date variable
    //   const expiryDateToSend = formatDate(expiryDate);

    const initialValueSubscription: SubscriptionModel = {
        id: 0,
        subscriberId: 0,
        productId: 0,
        discountId: 0,
        startDate: new Date(),
        expiryDate: new Date("dd-mm-yy"),
        priceAfterDiscount: 0,
        taxId: 2,
        cgst: 0,
        sgst: 0,
        totalTaxPercent: 0,
        taxAmount: 0,
        finalAmount: 0
    }
    // Assuming startDate is your starting date and daysToAdd is the number of days you want to add
    function addDays(startDate: Date, daysToAdd: number): Date {
        const endDate = new Date(startDate.getTime());
        endDate.setDate(startDate.getDate() + daysToAdd);
        return endDate;
    }

    // Example usage:
    const startDate = new Date(); // Your starting date
    const daysToAdd = 7; // Number of days to add
    const expiryDate = addDays(startDate, daysToAdd);
    console.log(expiryDate);

    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionModel>(initialValueSubscription)
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    async function fetchData() {
        const fetchSubscriberInfo = await GetSubscriberAsync();
        setSubscriberInfo(fetchSubscriberInfo.data);
        console.log("fetchSubscriberInfo");
        console.log(fetchSubscriberInfo);

        const fetchProductInfo = await GetProductAsync();
        setProductInfo(fetchProductInfo.data);
        console.log("fetchProductInfo");
        console.log(fetchProductInfo)

        const fetchDiscountInfo = await GetDiscountAsync();
        setDiscountInfo(fetchDiscountInfo.data);
        console.log("fetchDiscountInfo");
        console.log(fetchDiscountInfo)

        if (id > 0) {
            const result = await GetSubscriptionByIdAsync(id);
            setSubscriptionInfo(result.data);
        }
    }


    const handleDateFieldChange = (name: any, value: any) => {
        setSubscriptionInfo((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setSubscriptionInfo(prev => ({ ...prev, [name]: value }));

        if(name === "startDate"){

            const date = new Date(value); 
            let startDate: Date = new Date();
            startDate.setDate(date.getDate() + 20);
            
            console.log(startDate)
            console.log(date)
            const daysToAdd = 7; 
            const expiryDate = addDays(startDate, daysToAdd);
            
            console.log(expiryDate);
            
            subscriptionInfo.expiryDate = expiryDate;            
        }
    }
    

    const handleSubmit = async () => {
        alert(JSON.stringify(subscriptionInfo))
        if (id > 0) {
            const result = await UpdateSubscriptionAsync(id, subscriptionInfo);
            setSubscriptionInfo(result.data);
            console.log(result)
        } else {
            const result = await CreateSubscriptionAsync(subscriptionInfo);
            console.log(result)
        }

        setSubscriptionInfo(initialValueSubscription);
    }

    const handleSelectChange = (
        event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setSubscriptionInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    return { setSubscriptionInfo, handleSelectChange, handleSubmit, handleTextChange, subscriberInfo, navigate, subscriptionInfo, productInfo, discountInfo, handleDateFieldChange }
}


