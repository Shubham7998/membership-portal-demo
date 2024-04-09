export interface SubscriptionModel {
    id : number,
    subscriberId : number,
    productId : number,
    productName? : string,
    productPrice? : number,
    discountId : number,
    discountCode? : string,
    discountAmount? : string,
    startDate : Date,
    expiryDate : Date,
    priceAfterDiscount : number,
    taxId : number,
    cgst : number,
    sgst : number,
    totalTaxPercent : number,
    taxAmount : number,
    finalAmount : number
}