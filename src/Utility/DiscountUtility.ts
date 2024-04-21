import React, { useEffect, useState } from 'react'
import { DiscountModel } from '../Models/DiscountModel'
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { SelectChangeEvent, SnackbarOrigin } from '@mui/material';
import { GetProductByIdAsync } from '../Services/ProductService';
import { CreateDiscountAsync, GetDiscountByIdAsync, UpdateDiscountAsync } from '../Services/DiscontService';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';
import { useNavigate } from 'react-router-dom';

export default function DiscountUtility(id: number) {

    let initialValue: DiscountModel = {
        id: 0,
        discountCode: '',
        discountAmount: 0,
        isDiscountInPercentage: false
    }
    const navigate = useNavigate();
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
    const handleSelectBooleanChange = (event: SelectChangeEvent) => {
        const val = event.target.value;
        const name = event.target.name;
        const value = val === "true";
        setDiscountInfo(prev => ({ ...prev, [name]: value }));
    };

    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();

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
                    displaySnackbar("Discount updated successfully", "success");
                }
                else {
                    alert("Create discount info");
                    await CreateDiscountAsync(discoutInfo);
                    displaySnackbar("Discount added successfully", "success");
                }
                setTimeout(() => {
                    navigate(`/showdiscounts`)
                }, 1000)
                // setDiscountInfo(initialValue);
            } catch (error) {
                console.error("Error  in saving Product information:", error);
            }
        } else {
            displaySnackbar("Fields marked in red are required", "error");
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
                parameterName: "discountAmount",
                errorMessage: "Discount Amount Must be Grater than Zero",
            });
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    return {
        navigate,setErrors,
        handleNumberChange, handleSelectChange,
        handleSubmit, discoutInfo,
        onInputChangeDiscount, errors,
        snackbarOpen, handleSnackbarClose,
        handleSelectBooleanChange, setDiscountInfo,
        snackbarSeverity, snackbarMessage
    }
}
