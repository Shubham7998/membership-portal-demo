export interface TaxModel {
    id : number,
    stateName? : string,
    sgst : number,
    cgst : number,
    totalTax? : number
}