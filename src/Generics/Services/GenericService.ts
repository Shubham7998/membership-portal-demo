import axios from "axios";
import { DiscountModel } from "../../Models/DiscountModel";
import GenderModel from "../../Models/GenderModel";
import { PaginatedModel } from "../../Models/PaginatedModel";
import { ProductModel } from "../../Models/ProductModel";
import ResponseModel from "../../Models/ResponseModel";
import { SubscriberModel } from "../../Models/SubscriberModel";
import { TaxModel } from "../../Models/TaxModel";
import { UserModel } from "../../Models/UserModel";
import API_URL from "../URL_Config";

interface GenericServiceProps {
    data?: UserModel[] | ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];
    tableName?: string;
    id?: number
}

interface GenericGetServiceProps {
    subscriberInfo: UserModel[] | ProductModel[] | SubscriberModel[] | DiscountModel[] | TaxModel[] | GenderModel[];
    tableName: string;
    page: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
}

export const CreateInfo = async (
    { data, tableName }: GenericServiceProps
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    try {
        const response = await axios.post(
            `${API_URL}/${tableName}`,
            data
        );
        result.data = response.data;
        result.errorCode = response.status + "";
    } catch (error) {
        alert(error);
        handleError(error, result);
    }

    return result;
};

export const UpdateInfo = async (
    { data, tableName, id }: GenericServiceProps
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    try {
        const response = await axios.put(
            `${API_URL}/${tableName}/${id}`,
            data
        );
        result.data = response.data;
        result.errorCode = response.status + "";
    } catch (error) {
        handleError(error, result);
    }

    return result;
};

export const DeleteInfoById = async (
    { tableName, id }: GenericServiceProps
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    try {
        const response = await axios.delete(`${API_URL}/${tableName}/${id}`);
        result.data = response.data;
        result.errorCode = response.status + "";
    } catch (error) {
        handleError(error, result);
    }

    return result;
};

export const GetInfoById = async (
    { tableName, id }: GenericServiceProps
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    try {
        const response = await axios.get(
            `${API_URL}/${tableName}/${id}`
        );
        result.data = response.data;
        result.errorCode = response.status + "";
    } catch (error) {
        handleError(error, result);
    }

    return result;
};

export const GetAllAsync = async (data: UserModel | ProductModel | SubscriberModel | DiscountModel | TaxModel | GenderModel,
    tableName: string,
    currentPage: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string
) => {
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
        const response = await axios.post(`${API_URL}${tableName}/paginatedsorting?page=${currentPage}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, data);
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
