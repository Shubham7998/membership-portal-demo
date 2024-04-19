import React, { useState } from 'react'

export default function PaginationUtility(recordsPerPage : number) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const npage = Math.ceil(totalPages / recordsPerPage);
    const numbers = [];
    for (let i = 1; i <= npage; i++) {
        numbers.push(i);
    }

    async function prevPage(e: any) {

        e.preventDefault();
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function prevPageDisabled(): boolean {

        return currentPage === 1;
    }
    function nextPageDisabled(): boolean {

        return currentPage === npage;
    }

    function nextPage(e: any): void {
        e.preventDefault();
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCurrentPage(id: number, e: any): void {
        e.preventDefault();
        setCurrentPage(id);
    }

    return {npage,setTotalPages,currentPage,changeCurrentPage,nextPage,prevPageDisabled,nextPageDisabled,prevPage,numbers}
}
