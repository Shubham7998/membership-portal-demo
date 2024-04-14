import axios from "axios";
import { DiscountModel } from "../Models/DiscountModel";
import ResponseModel from "../Models/ResponseModel";
import API_URL from "../Generics/URL_Config";



export const CreateDiscountAsync = async (
    discountInfo: DiscountModel
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .post(`${API_URL}discout`, discountInfo)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;

};
export const UpdateDiscountAsync = async (
    discountInfo: DiscountModel, id: number
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .put(`${API_URL}discout/${id}`, discountInfo)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
};
export const GetDiscountByIdAsync = async (
    id: number
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .get(`${API_URL}discout/${id}`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
};
export const DeleteDiscountAsync = async (
    id: number
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .delete(`${API_URL}discout/${id}`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
};
export const GetDiscountAsync = async (
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .get(`${API_URL}discout`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
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