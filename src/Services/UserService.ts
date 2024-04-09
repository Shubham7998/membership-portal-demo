import React from 'react'
import ResponseModel from '../Models/ResponseModel';
import { UserModel } from '../Models/UserModel';
import axios from 'axios';

async function CreateUserService(userInfo : UserModel) : Promise<ResponseModel> {
  
    let result : ResponseModel = {
        error: "",
        data: null,
        message: '',
        errorCode: ''
    }

    console.log("Add user properties");

    await axios
    .post("http://localhost:5224/api/user", userInfo)
    .then( function (response){
        result.data = response.data;
        result.errorCode = response.status + "";
    })
    .catch(function (error) {
        alert(JSON.stringify(error));
    })
    return result;
}
async function UpdateUserService(userInfo : UserModel, id : number) : Promise<ResponseModel> {
  
    let result : ResponseModel = {
        error: "",
        data: null,
        message: '',
        errorCode: ''
    }

    console.log("Update user properties");

    await axios
    .put(`http://localhost:5224/api/user/${id}`, userInfo)
    .then( function (response){
        result.data = response.data;
        result.errorCode = response.status + "";
    })
    .catch(function (error) {
        alert(JSON.stringify(error));
    })
    return result;
}
async function GetUserService(id : number) : Promise<ResponseModel> {
  
    let result : ResponseModel = {
        error: "",
        data: null,
        message: '',
        errorCode: ''
    }

    console.log("Add user properties");

    await axios
    .get(`http://localhost:5224/api/user/${id}`)
    .then( function (response){
        result.data = response.data;
        result.errorCode = response.status + "";
    })
    .catch(function (error) {
        alert(JSON.stringify(error));
    })
    return result;
}
async function DeleteUserService(id : number) : Promise<ResponseModel> {
  
    let result : ResponseModel = {
        error: "",
        data: null,
        message: '',
        errorCode: ''
    }

    console.log("Add user properties");

    await axios
    .delete(`http://localhost:5224/api/user/${id}`)
    .then( function (response){
        result.data = response.data;
        result.errorCode = response.status + "";
    })
    .catch(function (error) {
        alert(JSON.stringify(error));
    })
    return result;
}
async function GetAllUserService() : Promise<ResponseModel> {
  
    let result : ResponseModel = {
        error: "",
        data: null,
        message: '',
        errorCode: ''
    }

    console.log("Add user properties");

    await axios
    .get(`http://localhost:5224/api/user`)
    .then( function (response){
        result.data = response.data;
        result.errorCode = response.status + "";
    })
    .catch(function (error) {
        alert(JSON.stringify(error));
    })
    return result;
}

export {CreateUserService, GetUserService, UpdateUserService, GetAllUserService, DeleteUserService}
