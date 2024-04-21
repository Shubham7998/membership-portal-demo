export interface SubscriptionModel {
    id : number,
    subscriberId : number,
    productId : number,
    productName? : string,
    productPrice? : number,
    discountId : number,
    discountCode? : string,
    discountAmount? : number,
    startDate? : Date | undefined ,
    expiryDate? : Date | undefined,
    priceAfterDiscount : number,
    taxId : number,
    cgst : number,
    sgst : number,
    totalTaxPercent : number,
    taxAmount : number,
    finalAmount : number
}