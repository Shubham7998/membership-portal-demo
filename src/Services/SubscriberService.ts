import { error } from "console";
import API_URL from "../Generics/URL_Config";
import ResponseModel from "../Models/ResponseModel"
import { SubscriberModel } from "../Models/SubscriberModel"
import axios from 'axios';

const URL = API_URL+'subscriber';

async function GetSubscriberAsync() : Promise<ResponseModel> {
    let result : ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Get subscriber async");

    await axios
    .get(URL)
    .then(function (response)  {
        result.data = response.data;
        console.log(result.data)
        result.message = response.status + "";
    })
    .catch(function  (error) {
        result.error = error + "";
        console.log(error);
    });

    return result;
} 

async function GetSubscriberByIdAsync(id : number) : Promise<ResponseModel> {
    let result : ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Get subscriber by id");

    await axios
    .get(URL+`/${id}`)
    .then(function (response)  {
         result.data = response.data;
         result.message = response.status + ""
    })
    .catch((error) => {
        result.error = error.message + "";
      //  console.log(error)
    })

    return result;
}
async function DeleteSubscriberByIdAsync(id : number) : Promise<ResponseModel> {
    let result : ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Delete subscriber by id");

    await axios
    .delete(URL+`${id}`)
    .then(function (response)  {
         result.data = response.data;
         result.message = response.status + ""
    })
    .catch((error) => {
        result.error = error.message + "";
    })

    return result;
}


async function CreateSubscriberAsync(subscriberInfo : SubscriberModel) : Promise<ResponseModel> {
    let result : ResponseModel = {
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
export {GetSubscriberAsync, GetSubscriberByIdAsync, CreateSubscriberAsync, }

