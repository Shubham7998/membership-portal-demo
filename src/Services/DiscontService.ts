import axios from "axios";
import { DiscountModel } from "../Models/DiscountModel";
import ResponseModel from "../Models/ResponseModel";
import API_URL from "../Generics/URL_Config";
import { PaginatedModel } from "../Models/PaginatedModel";
import { ProductModel } from "../Models/ProductModel";

const URL = `${API_URL}discount`;

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
        .post(URL, discountInfo)
        .then(function (response) {
            if(response.data != null){
                result.data = response.data;
            }
        })
        .catch(function (error) {
            console.log(error)
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
    alert(URL)
    await axios
        .put(`${URL}/${id}`, discountInfo)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            console.log(error)
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

    alert(`${URL}/${id}`)

    await axios
        .get(`${URL}/${id}`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            console.log(error)
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
        .delete(`${API_URL}discount/${id}`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            console.log(error)
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
        .get(`${API_URL}discount`)
        .then(function (response) {
            result.data = response.data;
        })
        .catch(function (error) {
            handleError(error, result);
            console.log(error)
        })
    return result;
};
export const GetPaginatedAdvanceDiscountAsync = async  (page  : number = 0, pageSize : number = 5, discountInfo : DiscountModel): Promise<PaginatedModel> => {
    let result: ResponseModel = {
      error: "",
      data: null,
      message: "",
      errorCode: "",
    };
  
    let paginatedResult : PaginatedModel = {
      dataArray: null,
      totalPages: 0
    }
    try {
      const response = await axios.post(`${API_URL}discount/paginated?page=${page}&pageSize=${pageSize}`,discountInfo);
      paginatedResult.dataArray = response.data.dataArray;
      paginatedResult.totalPages = response.data.totalPages;
  
      result.errorCode = response.status + "";
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