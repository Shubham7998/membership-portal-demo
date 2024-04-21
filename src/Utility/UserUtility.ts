import React, { useEffect, useState } from 'react'
import { UserModel } from '../Models/UserModel';
import { CreateUserService, GetUserService, UpdateUserService } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { isValidContactNumber, isValidEmailAddress, isValidName, isValidPassword, removeSpace } from '../Generics/Validations';
import { Snackbar, SnackbarOrigin } from "@mui/material";
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';

export function UserUtility(id: number) {
    const initialValue: UserModel = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: ''
    }

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserModel>(initialValue);

    const newErrors: ParameterErrorModel[] = [];

    const [errors, setErrors] = useState<ParameterErrorModel[]>(newErrors);

    const { displaySnackbar, handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity } = SnackBarGeneric();

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        if (id > 0) {
            try {
                const result = await GetUserService(id);
                console.log("result.errorCode = " + result.errorCode)

                if (result.errorCode == "200") {
                    console.log("result.errorCode = " + result.errorCode)
                    if (result != null) {
                        setUserInfo(result.data);
                        console.log(result.data);

                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setUserInfo(initialValue);
        }
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setUserInfo(prev => ({ ...prev, [name]: value }));
        // isValidate();
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            setUserInfo(prevState => ({ ...prevState, [name]: value }));
        }
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const isValidate = () => {

        if (userInfo.firstName.trim() === "") {
            newErrors.push({
                parameterName: "firstName",
                errorMessage: "Please enter a first name"
            })
            console.log("first name")
        } else if (userInfo.firstName.length > 25) {
            newErrors.push({
                parameterName: "firstName",
                errorMessage: "FirstName atmost contain 25 chars"
            })
        } else if (!isValidName(userInfo.firstName)) {
            newErrors.push({
                parameterName: "firstName",
                errorMessage: "Please enter valid first name"
            })
        } else {
            userInfo.firstName = removeSpace(userInfo.firstName);
        }

        if (userInfo.lastName.trim() === "") {
            newErrors.push({
                parameterName: "lastName",
                errorMessage: "Please enter a Last name"
            })
            console.log("lastName")
        } else if (userInfo.lastName.length > 25) {
            newErrors.push({
                parameterName: "lastName",
                errorMessage: "LastName atmost contain 25 chars"
            })
        } else if (!isValidName(userInfo.lastName)) {
            newErrors.push({
                parameterName: "lastName",
                errorMessage: "Please enter valid Last name"
            })
        } else {
            userInfo.lastName = removeSpace(userInfo.lastName);
        }

        if (userInfo.email.trim() === "") {
            newErrors.push({
                parameterName: "email",
                errorMessage: "Please enter a email"
            })

            console.log("email")
        }
        else if (!isValidEmailAddress(userInfo.email)) {
            newErrors.push({
                parameterName: "email",
                errorMessage: "Please enter valid email"
            })
            console.log("email 1")
        }

        if (userInfo.contactNumber.trim() === "") {
            newErrors.push({
                parameterName: "contactNumber",
                errorMessage: "Please enter a mobile number"
            })
        }
        else if (userInfo.contactNumber.length != 10) {
            newErrors.push({
                parameterName: "contactNumber",
                errorMessage: "Please enter 10 digit mobile number"
            })
        }
        else {
            if (!isValidContactNumber(userInfo.contactNumber)) {
                newErrors.push({
                    parameterName: "contactNumber",
                    errorMessage: "Please enter a valid mobile number"
                })
                console.log("Contact Number 1")
            }
        }

        if (userInfo.password.trim() === "") {
            newErrors.push({
                parameterName: "password",
                errorMessage: "Please enter a password"
            })
        } else if (userInfo.password.length > 20 || userInfo.password.length < 8) {
            newErrors.push({
                parameterName: "password",
                errorMessage: "Password atleast contain 8 chars and at most contain 20 chars "
            })
        }
        else {
            if (!isValidPassword(userInfo.password)) {
                newErrors.push({
                    parameterName: "password",
                    errorMessage: "Password must contain atleast one \ncapital letter \nsmall letter \nNumber "
                })
            }
        }

        setErrors(newErrors);

        return newErrors.length === 0;
    };


    async function handleSubmit() {
        if (isValidate()) {
            try {
                if (id > 0) {
                    var result = await UpdateUserService(userInfo, id);
                    console.log(result.data);
                    displaySnackbar("User updated successfully", "success")
                } else {
                    var result = await CreateUserService(userInfo);
                    console.log(result.data);
                    displaySnackbar("User added successfully", "success")
                }
                setErrors(newErrors);

                setTimeout(() => {
                    navigate(`/showusers`);
                }, 1000);
            } catch (error) {
                console.log(error)

            }
        } else {
            displaySnackbar("Fields marked in red are required", "error")
            setErrors(newErrors);
        }
    }
    const handleClear = () => {
        setErrors([]);
        setUserInfo(initialValue);
    }
    return {handleClear,setErrors, navigate, setUserInfo, userInfo, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity };
}
