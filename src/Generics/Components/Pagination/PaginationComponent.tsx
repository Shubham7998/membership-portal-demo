import { ButtonGroup, Button } from '@mui/material';
import React from 'react'
import { DiscountModel } from '../../../Models/DiscountModel';
import GenderModel from '../../../Models/GenderModel';
import { ProductModel } from '../../../Models/ProductModel';
import { SubscriberModel } from '../../../Models/SubscriberModel';
import { TaxModel } from '../../../Models/TaxModel';
import { UserModel } from '../../../Models/UserModel';
interface GenericListProps {
    data: UserModel[] | ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    dataHeader: string[],
    isSearchMode: boolean
}

interface PaginationProps {
    numbers : number[],
    prevPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    prevPageDisabled(): boolean | undefined,
    changeCurrentPage(n: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    nextPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    nextPageDisabled(): boolean | undefined
}

export default function PaginationComponent({numbers,prevPage, prevPageDisabled, changeCurrentPage, nextPage, nextPageDisabled} : PaginationProps) { 

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
             <ButtonGroup color="primary" aria-label="navigation">
                <Button onClick={(e) => prevPage(e)} disabled={prevPageDisabled()} sx={{
                }}>Prev</Button>

                {
                    numbers.map((n, i) => (
                        <Button key={i} onClick={(e) => changeCurrentPage(n, e)}>{n}</Button>
                    ))
                }
                <Button onClick={(e) => nextPage(e)} disabled={nextPageDisabled()}>Next</Button>
            </ButtonGroup> 
        </div>
    )
}

// export default function Pagination({ numbers, prevPage, prevPageDisabled, changeCurrentPage, nextPage, nextPageDisabled }: PaginationProps) {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
//             <ButtonGroup color="primary" aria-label="navigation">
//                 <Button onClick={(e) => prevPage(e)} disabled={prevPageDisabled()} sx={{}}>Prev</Button>
//                 {numbers.map((n, i) => (
//                     <Button key={i} onClick={(e) => changeCurrentPage(n, e)}>{n}</Button>
//                 ))}
//                 <Button onClick={(e) => nextPage(e)} disabled={nextPageDisabled()}>Next</Button>
//             </ButtonGroup>
//         </div>
//     )
// }

