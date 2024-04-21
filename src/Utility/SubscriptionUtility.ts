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
import { SelectChangeEvent, } from "@mui/material";
import { CreateSubscriptionAsync, GetSubscriptionByIdAsync, UpdateSubscriptionAsync } from '../Services/SubscriptionService';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';
import { ParameterErrorModel } from '../Models/ParameterErrorModel';

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

    const initialValueSubscription: SubscriptionModel = {
        id: 0,
        subscriberId: 0,
        productId: 0,
        discountId: 0,
        startDate: new Date(),
        expiryDate: new Date(),
        priceAfterDiscount: 0,
        
        taxId: 4,
        cgst: 0,
        sgst: 0,
        totalTaxPercent: 0,
        taxAmount: 0,
        finalAmount: 0,
        productPrice: 0
    }
    const { displaySnackbar, handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity } = SnackBarGeneric();

    const newErrors: ParameterErrorModel[] = [];

    const [errors, setErrors] = useState<ParameterErrorModel[]>([]);

    const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionModel>(initialValueSubscription)

    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
        console.log("use effect")
    }, [])

    async function fetchData() {
        const fetchSubscriberInfo = await GetSubscriberAsync();
        if (fetchSubscriberInfo != null) {
            setSubscriberInfo(fetchSubscriberInfo.data);
            console.log("fetchSubscriberInfo");
            console.log(fetchSubscriberInfo);

        }
        const fetchProductInfo = await GetProductAsync();
        if (fetchProductInfo != null) {
            setProductInfo(fetchProductInfo.data);
            console.log("fetchProductInfo");
            console.log(fetchProductInfo)
        }

        const fetchDiscountInfo = await GetDiscountAsync();

        if (fetchDiscountInfo != null) {

            setDiscountInfo(fetchDiscountInfo.data);
            console.log("fetchDiscountInfo");
            console.log(fetchDiscountInfo)
        }

        if (id > 0) {
            const result = await GetSubscriptionByIdAsync(id);
            if (result) {
                setSubscriptionInfo(result.data);
            }
        }
    }

    const isValidate1 = () => {
        alert(JSON.stringify(subscriptionInfo))
        console.log(subscriptionInfo)
        if (subscriptionInfo.productId === 0) {
            newErrors.push({
                parameterName: "productId",
                errorMessage: "Please select product"
            })
        }
        if (subscriptionInfo.subscriberId === 0) {
            newErrors.push({
                parameterName: "subscriberId",
                errorMessage: "Please select product"
            })
        }


        setErrors(newErrors);

        return newErrors.length === 0;

    }
    const isValidate = () => {

        const currentDate = new Date();

        if (!subscriptionInfo.startDate || subscriptionInfo.startDate < currentDate) {
            newErrors.push({
                parameterName: "startDate",
                errorMessage: "Please select a valid start date"
            });
        }

        if (!subscriptionInfo.expiryDate || subscriptionInfo.expiryDate < currentDate) {
            newErrors.push({
                parameterName: "expiryDate",
                errorMessage: "Please select a valid expiry date"
            });
        }

        if (subscriptionInfo.startDate && subscriptionInfo.expiryDate &&
            subscriptionInfo.startDate >= subscriptionInfo.expiryDate) {
            newErrors.push({
                parameterName: "expiryDate",
                errorMessage: "Expiry date must be after start date"
            });
        }

        if (subscriptionInfo.productId === 0) {
            newErrors.push({
                parameterName: "productId",
                errorMessage: "Please select a product"
            });
        }
        if (subscriptionInfo.subscriberId === 0) {
            newErrors.push({
                parameterName: "subscriberId",
                errorMessage: "Please select a subscriber"
            });
        }
        
        setErrors(newErrors);

        return newErrors.length === 0;
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
    }


    const handleSubmit = async () => {
        alert(JSON.stringify(subscriptionInfo))
        if (isValidate()) {
            if(subscriptionInfo.discountId == 0){
                subscriptionInfo.discountId = 1;
            } 
            if (id > 0) {
                const result = await UpdateSubscriptionAsync(id, subscriptionInfo);
                setSubscriptionInfo(result.data);
                console.log(result)
                displaySnackbar("Subscription details updated successfully", "success");
            } else {
                alert("Create subscription subscription")
                const result = await CreateSubscriptionAsync(subscriptionInfo);
                console.log(result)
                displaySnackbar("Subscription details added successfully", "success");

            }
            setTimeout(() => {
                navigate(`/showsubscriptions`);
            }, 1000);
            setSubscriptionInfo(initialValueSubscription);
        } else {
            displaySnackbar("Please field mendatory fields", "error");
        }
    }

    const handleSelectChange = (
        event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setSubscriptionInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    return { errors, setSubscriptionInfo, handleSelectChange, handleSubmit, handleTextChange, subscriberInfo, navigate, subscriptionInfo, productInfo, discountInfo, handleDateFieldChange, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity }
}


