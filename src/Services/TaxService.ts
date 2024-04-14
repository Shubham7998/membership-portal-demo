import axios from "axios";
import { DiscountModel } from "../Models/DiscountModel";
import ResponseModel from "../Models/ResponseModel";
import API_URL from "../Generics/URL_Config";
import { TaxModel } from "../Models/TaxModel";



export const CreateTaxAsync = async (
    taxInfo: TaxModel
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .post(`${API_URL}tax`, taxInfo)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;

};
export const UpdateTaxAsync = async (
    taxInfo: TaxModel, id: number
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .put(`${API_URL}tax/${id}`, taxInfo)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
};
export const GetTaxByIdAsync = async (
    id: number
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .get(`${API_URL}tax/${id}`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
};
export const DeleteTaxAsync = async (
    id: number
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .delete(`${API_URL}tax/${id}`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            alert(JSON.stringify(error));
        })
    return result;
};
export const GetTaxAsync = async (
): Promise<ResponseModel> => {
    let result: ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: "",
    };

    await axios
        .get(`${API_URL}tax`)
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