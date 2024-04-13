import React, { useEffect, useState } from 'react'
import { UserModel } from '../Models/UserModel';
import { CreateUserService, GetUserService, UpdateUserService } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { isValidContactNumber, isValidEmailAddress, isValidName, isValidPassword, removeSpace } from '../Generics/Validations';
import { SnackbarOrigin } from "@mui/material";

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

    const [errors, setErrors] = useState<ParameterErrorModel[]>([]);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarPosition, setSnackbarPosition] =
        React.useState<SnackbarOrigin>({
            vertical: "top",
            horizontal: "center",
        });
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<
        "success" | "error" | "info" | "warning"
    >();

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        if (id > 0) {
            try {
                const result = await GetUserService(id);
                console.log("result.errorCode = "+ result.errorCode )
                if(result.errorCode == "200"){
                    console.log("result.errorCode = "+ result.errorCode )
                    if(result != null){
                        setUserInfo(result.data);
                        console.log(result.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }else{
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

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
        // isValidate();
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
            console.log("Contact Number")
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
                    alert("update");
                    var result = await UpdateUserService(userInfo, id);
                    alert(result.data);
                    console.log(result.data);
                    setSnackbarMessage("User updated successfully");
                } else {
                    var result = await CreateUserService(userInfo);
                    alert(result.data);
                    console.log(result.data);
                    setSnackbarMessage("User added successfully");
                }
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setErrors(newErrors);

                //Navigate to another page after 2 seconds
                setTimeout(() => {
                    navigate(`/showusers`); 
                }, 1000);
            } catch (error) {
                console.log(error)

            }
        } else {
            setSnackbarMessage("Fields marked in red are required");
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setErrors(newErrors);
        }
    }

    return { userInfo, handleTextChange, handleNumberChange, handleSelectChange, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarPosition, snackbarSeverity };
}
