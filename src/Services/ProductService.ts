import axios from "axios";
import ResponseModel from "../Models/ResponseModel";
import API_URL from "../Generics/URL_Config";
import { ProductModel } from "../Models/ProductModel";
import { PaginatedModel } from "../Models/PaginatedModel";


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
      const response = await axios.put(`${API_URL}product/${productId}`, updatedInfo);
      result.data = response.data;
      result.errorCode = response.status + "";
      alert(JSON.stringify(result))
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
      const response = await axios.delete(`${API_URL}product/${id}`);
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
export const GetPaginatedProductAsync = async  (page  : number = 0, pageSize : number = 5): Promise<PaginatedModel> => {
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
    const response = await axios.get(`${API_URL}product/paginated?page=${page}&pageSize=${pageSize}`);
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
export const GetPaginatedAdvanceProductAsync = async  (page  : number = 0, pageSize : number = 5, productInfo : ProductModel): Promise<PaginatedModel> => {
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
    const response = await axios.post(`${API_URL}product/paginated?page=${page}&pageSize=${pageSize}`,productInfo);
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
