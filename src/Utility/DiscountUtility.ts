import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel'
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { SelectChangeEvent, SnackbarOrigin } from '@mui/material';
import { GetProductByIdAsync } from '../Services/ProductService';
import { CreateDiscountAsync, GetDiscountByIdAsync, UpdateDiscountAsync } from '../Services/DiscontService';

export default function DiscountUtility(id : number) {

    let initialValue : DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }

    const [discoutInfo, setDiscountInfo] = useState<DiscountModel>(initialValue);

    const newErrors: ParameterErrorModel[] = [];

    const [errors, setErrors] = useState<ParameterErrorModel[]>([]);


    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            setDiscountInfo(prevState => ({ ...prevState, [name]: value }));
        }
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const onInputChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
        var name = event.currentTarget.name;
        var newValue = event.currentTarget.value;
        setDiscountInfo((prev) => ({ ...prev, [name]: newValue }));

        setErrors((prevErrors) => {
            const newErrors = prevErrors.filter((error) => error.parameterName !== name);
            return newErrors;
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const val = event.target.value;
        const name = event.target.name;
    
        setDiscountInfo(prev => ({ ...prev, [name]: val }));
      };

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

    async function fetchData() {
        try {
            if (id > 0) {
                const response = await GetDiscountByIdAsync(id);
                if (response.data) {
                    setDiscountInfo(response.data);
                }
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    }

    const handleSubmit = async () => {
        alert(discoutInfo)
        if (isValidate()) {
            console.log("isValidate");
            try {
                if (discoutInfo.id !== 0) {
                    console.log("Update discount info")
                    var response = await UpdateDiscountAsync(discoutInfo, discoutInfo.id);
                    alert(response.data);
                    alert("wth")
                    setSnackbarMessage("Discount updated successfully");
                }
                else {
                    alert("Create discount info");
                    await CreateDiscountAsync(discoutInfo);
                    setSnackbarMessage("Discount data created successfully");
                }
                setDiscountInfo(initialValue);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                // setSnackbarMessage("Fields marked in red are required");
                // setSnackbarSeverity("warning");
                console.error("Error  in saving Product information:", error);
            }
        } else {
            setSnackbarMessage("Fields marked in red are required");
            setSnackbarOpen(true);
            setSnackbarSeverity("error");
            setErrors(newErrors);
        }
    };

    const isValidate = () => {
        if (discoutInfo.discountCode.trim() === "") {
            newErrors.push({
                parameterName: "discountCode",
                errorMessage: "Enter Discount name",
            });
        } 
        if (discoutInfo.discountAmount < 1) {
            newErrors.push({
                parameterName: "price",
                errorMessage: "Discount Amount Must be Grater than Zero",
            });
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    return {handleNumberChange, handleSelectChange, 
        handleSubmit, discoutInfo, 
        onInputChangeDiscount,errors,
        snackbarOpen,handleSnackbarClose,
        snackbarPosition, 
        snackbarSeverity,snackbarMessage}
}
