import API_URL from "../Generics/URL_Config";
import ResponseModel from "../Models/ResponseModel";
import axios from "axios";

const genderURL = `${API_URL}gender`;
export async function GetAllGenderAsync() : Promise<ResponseModel> {
    const result : ResponseModel = {
        error: "",
        data: null,
        message: "",
        errorCode: ""
    }

    console.log("Get all gender async")

    await axios
    .get(genderURL)
    .then(function(response) {
        if(response.data != null){
            result.data = response.data;
        result.errorCode = response.status + "";
        }
    })
    .catch(function (error) {
        result.error = error;
        console.log(error)
    })

    return result;
}