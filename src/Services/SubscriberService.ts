import { error } from "console";
import API_URL from "../Generics/URL_Config";
import ResponseModel from "../Models/ResponseModel"
import { SubscriberModel } from "../Models/SubscriberModel"
import axios from 'axios';
import { DiscountModel } from "../Models/DiscountModel";
import { PaginatedModel } from "../Models/PaginatedModel";

const URL = API_URL + 'subscriber/';

async function GetSubscriberAsync(): Promise<ResponseModel> {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Get subscriber async");

    await axios
        .get(URL)
        .then(function (response) {
            result.data = response.data;
            console.log(result.data)
            result.message = response.status + "";
        })
        .catch(function (error) {
            result.error = error + "";
            console.log(error);
        });

    return result;
}

async function GetSubscriberByIdAsync(id: number): Promise<ResponseModel> {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    await axios
        .get(URL + `${id}`)
        .then(function (response) {
            if (!response.data) {
                    console.log(`Data with id = ${id} is not found`)
            } else {
                result.data = response.data;
                result.errorCode = response.status + "";
            }
        })
        .catch((error) => {
            result.error = error.message + "";
        })

    return result;
}
async function GetSubscriberSortedAsync(tableName: string, sortOrder: string): Promise<ResponseModel> {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Get subscriber by id");
    await axios
        .get(URL + `sorting?sortColumn=${tableName}&sortOrder=${sortOrder}`)
        .then(function (response) {
            if (!response.data) {
                console.log(`Data  is not found`)
            } else {
                result.data = response.data;
                result.errorCode = response.status + "";
            }
        })
        .catch((error) => {
            result.error = error.message + "";
        })

    return result;
}
async function DeleteSubscriberByIdAsync(id: number): Promise<ResponseModel> {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Delete subscriber by id");

    await axios
        .delete(URL + `${id}`)
        .then(function (response) {
            if (!response.data) {
                console.log(`Data with id = ${id} is not found`)
            } else {
                result.data = response.data;
                result.errorCode = response.status + "";
            }
        })
        .catch((error) => {
            result.error = error.message + "";
        })

    return result;
}


async function CreateSubscriberAsync(subscriberInfo: SubscriberModel): Promise<ResponseModel> {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Create subscriber Service")

    await axios
        .post(URL, subscriberInfo)
        .then(function (response) {
            result.data = response.data;
            result.message = response.statusText + "";
        })
        .catch(function (error) {
            result.error = error;
            alert(error);
        })

    return result;
}

const UpdateSubscriberAsync = async (subscriberInfo: SubscriberModel, id: number): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Update subscriber async")

    await axios
        .put(URL + `${id}`, subscriberInfo)
        .then(function (response) {
            if (!response.data) {
                console.log(`Data with id = ${id} is not found`)
            } else {
                result.data = response.data;
                result.errorCode = response.status + "";
            }
        })
        .catch(function (error) {
            alert(error)
            console.log(error)
        })

    return result;
}
export const GetPaginatedAdvanceSubscriberAsync = async (page: number = 0, pageSize: number = 5, subscriberInfo: SubscriberModel): Promise<PaginatedModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    let paginatedResult: PaginatedModel = {
        dataArray: null,
        totalPages: 0
    }
    try {
        const response = await axios.post(`${API_URL}subscriber/paginated?page=${page}&pageSize=${pageSize}`, subscriberInfo);
        paginatedResult.dataArray = response.data.dataArray;
        paginatedResult.totalPages = response.data.totalPages;

        console.log(paginatedResult)

        console.log(response);

        result.errorCode = response.status + "";
    } catch (error) {
        handleError(error, result);
    }

    return paginatedResult;
};
export const GetPaginatedAdvanceSearchSortingSubscriberAsync = async (page: number = 1, pageSize: number = 5, sortColumn: string = "", sortOrder: string = "asc", subscriberInfo: SubscriberModel): Promise<PaginatedModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    let paginatedResult: PaginatedModel = {
        dataArray: null,
        totalPages: 0
    }
    try {///api/subscriber/paginatedsorting?page=0&pageSize=0&sortColumn=string&sortOrder=string
        const response = await axios.post(`${API_URL}subscriber/paginatedsorting?page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, subscriberInfo);
        if (result != null) {
            paginatedResult.dataArray = response.data.dataArray;
            paginatedResult.totalPages = response.data.totalPages;

            console.log(paginatedResult)

            console.log(response);

            result.errorCode = response.status + "";
        }
    } catch (error) {
        handleError(error, result);
    }

    return paginatedResult;
};

const handleError = (error: any, result: ResponseModel) => {
    if (error.response) {
        result.error = error.response.data;
        result.errorCode = error.response.status;
        result.message = error.message;
    } else if (error.request) {
        result.error = error.message;
        result.errorCode = error.request.code;
        result.message = error.message;
    } else {
        result.error = "No response received from server";
        result.errorCode = error.response ? error.response.status : "";
    }
};
export { GetSubscriberSortedAsync, UpdateSubscriberAsync, GetSubscriberAsync, GetSubscriberByIdAsync, CreateSubscriberAsync, DeleteSubscriberByIdAsync }

