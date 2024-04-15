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

export default function SubscriptionUtility(id : number) {
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

    const initialValueSubscription : SubscriptionModel = {
        id: 0,
        subscriberId: 0,
        productId: 0,
        discountId: 0,
        startDate: new Date,
        expiryDate: new Date,
        priceAfterDiscount: 0,
        taxId: 0,
        cgst: 0,
        sgst: 0,
        totalTaxPercent: 0,
        taxAmount: 0,
        finalAmount: 0
    }

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
    }



    return { subscriberInfo, navigate , subscriptionInfo, productInfo, discountInfo}

}


