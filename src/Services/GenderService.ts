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
        console.log(genderURL);
        result.data = response.data;
        console.log("result"+result.data)
        console.log("response"+response.data)
        result.errorCode = response.status + "";
    })
    .catch(function (error) {
        result.error = error;
        console.log(error)
        alert(JSON.stringify(error))
    })

    return result;
}