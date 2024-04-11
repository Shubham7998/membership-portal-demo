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

export {GetSubscriberAsync, }

