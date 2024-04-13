import axios from "axios";
import ResponseModel from "../Models/ResponseModel";
import API_URL from "../Generics/URL_Config";
import { ProductModel } from "../Models/ProductModel";


export const CreateProductAsync = async (
  productinfo: ProductModel
): Promise<ResponseModel> => {
  let result: ResponseModel = {
    error: "",
    data: null,
    message: "",
    errorCode: "",
  };

  try {
   
    const response = await axios.post(
      `http://localhost:5224/api/product`,productinfo
    );
    
    result.data = response.data;
    result.errorCode = response.status + "";
  } catch (error) {
    alert(error);
    handleError(error, result);
  }

  return result;
};

export const UpdateProductAsync = async (
    productId: number,
    updatedInfo: ProductModel
  ): Promise<ResponseModel> => {
    let result: ResponseModel = {
      error: "",
      data: null,
      message: "",
      errorCode: "",
    };
  
    try {
      const response = await axios.put(`${API_URL}/product/${productId}`, updatedInfo);
      result.data = response.data;
      result.errorCode = response.status + "";
    } catch (error) {
      handleError(error, result);
    }
  
    return result;
  };
  
  export const DeleteProductAsync = async (
    id: number
  ): Promise<ResponseModel> => {
    let result: ResponseModel = {
      error: "",
      data: null,
      message: "",
      errorCode: "",
    };
  
    try {
      const response = await axios.delete(`${API_URL}/product/${id}`);
      result.data = response.data;
      result.errorCode = response.status + "";
    } catch (error) {
      handleError(error, result);
    }
  
    return result;
  };
  

export const GetProductByIdAsync = async (id: number): Promise<ResponseModel> => {
  let result: ResponseModel = {
    error: "",
    data: null,
    message: "",
    errorCode: "",
  };

  try {
    const response = await axios.get(`http://localhost:5224/api/product/${id}`);
    result.data = response.data;
    result.errorCode = response.status + "";
  } catch (error) {
    handleError(error, result);
  }

  return result;
};

export const SearchProductAsync = async (
  input: string
): Promise<ResponseModel> => {
  let result: ResponseModel = {
    error: "",
    data: null,
    message: "",
    errorCode: "",
  };

  try {
    const response = await axios.get(`${API_URL}product/search?search=${input}`);
    result.data = response.data;
    result.errorCode = response.status + "";
  } catch (error) {
    handleError(error, result);
  }

  return result;
};


export const GetProductAsync = async (): Promise<ResponseModel> => {
  let result: ResponseModel = {
    error: "",
    data: null,
    message: "",
    errorCode: "",
  };

  try {
    const response = await axios.get(`${API_URL}product`);
    result.data = response.data;
    result.errorCode = response.status + "";
  } catch (error) {
    handleError(error, result);
  }

  return result;
};

export const Searchproducts = async (
  searchQuery: string
): Promise<ResponseModel> => {
  let result: ResponseModel = {
    error: "",
    data: null,
    message: "",
    errorCode: "",
  };

  try {
    const response = await axios.get(
      `${API_URL}/products/search?q=${searchQuery}`
    );
    result.data = response.data;
    result.errorCode = response.status + "";
  } catch (error) {
    handleError(error, result);
  }

  return result;
};

export const AdvanceSearchProductAsync = async (
  productinfo: ProductModel
): Promise<ResponseModel> => {
  let result: ResponseModel = {
    error: "",
    data: null,
    message: "",
    errorCode: "",
  };

  try {
    alert("advance search");
    const response = await axios.post(
      `${API_URL}/product/advanceSearch`,
      productinfo
    );
    result.data = response.data;
    result.errorCode = response.status + "";
  } catch (error) {
    alert("advance search catch ");
    handleError(error, result);
  }

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