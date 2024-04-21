import axios from "axios";
import ResponseModel from "../Models/ResponseModel";
import { SubscriptionModel } from "../Models/SubscriptionModel";
import API_URL from "../Generics/URL_Config";

const URL = `${API_URL}subscription`

 async function CreateSubscriptionAsync(subscriptionInfo : SubscriptionModel) : Promise<ResponseModel>{
    let result : ResponseModel = {
        error: "",
        data: undefined,
        message: "",
        errorCode: ""
    }

    console.log("Create subscription");
    alert(URL)
    await axios
    .post(URL, subscriptionInfo)
    .then(function (response) {
        if(response.data != null){
            result.data = response.data;
        }
    })
    .catch(function (error) {
        result.error = error;
    })
    return result;
}
async function GetSubscriptionAsync(): Promise<ResponseModel>{
    let result : ResponseModel = {
        error: "",
        data: undefined,
        message: "",
        errorCode: ""
    }

    console.log("Get subscription");
    alert(URL);

    await axios
    .get(URL)
    .then(function (response) {
        if(response.data != null){
            result.data = response.data;
        }
    })
    .catch(function (error) {
        result.error = error;
    })

    return result;
}
async function DeleteSubscriptionAsync(id : number): Promise<ResponseModel>{
    let result : ResponseModel = {
        error: "",
        data: undefined,
        message: "",
        errorCode: ""
    }

    await axios
    .delete(`${URL}/${id}`)
    .then(function (response) {
        if(response.data != null){
            result.data = response.data;
        }
    })
    .catch(function (error) {
        result.error = error;
    })
    return result;
}
async function GetSubscriptionByIdAsync(id : number): Promise<ResponseModel>{
    let result : ResponseModel = {
        error: "",
        data: undefined,
        message: "",
        errorCode: ""
    }


    await axios
    .get(`${URL}/${id}`)
    .then(function (response) {
        if(response.data != null){
            result.data = response.data;
        }
    })
    .catch(function (error) {
        result.error = error;
    })
    return result;
}
async function UpdateSubscriptionAsync(id : number, subscriberInfo : SubscriptionModel): Promise<ResponseModel>{
    let result : ResponseModel = {
        error: "",
        data: undefined,
        message: "",
        errorCode: ""
    }

   

    await axios
    .put(`${URL}/${id}`,subscriberInfo)
    .then(function (response) {
        if(response.data != null){
            result.data = response.data;
        }
    })
    .catch(function (error) {
        result.error = error;
    })
    return result;
}
export {CreateSubscriptionAsync, GetSubscriptionAsync,GetSubscriptionByIdAsync,UpdateSubscriptionAsync,DeleteSubscriptionAsync}