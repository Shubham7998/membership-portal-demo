import { SnackbarOrigin } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParameterErrorModel } from "../../Models/ParameterErrorModel";
import { ProductModel } from "../../Models/ProductModel";
import { CreateProductAsync, DeleteProductAsync, GetProductByIdAsync, UpdateProductAsync } from "../../Services/ProductService";
import { isValidName } from "../../Generics/Validations";
import SnackBarGeneric from "../../Generics/Components/Snackbar/SnackBarGeneric";

export default function ProductUtility(id: number) {
    const navigate = useNavigate();
    const initialValue: ProductModel = {
        id: id,
        productName: "",
        price: 0,
    };

    const [productInfo, setProductInfo] = useState<ProductModel>(initialValue);

    const newErrors: ParameterErrorModel[] = [];

    const [errors, setErrors] = useState<ParameterErrorModel[]>([]);

    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            if (id > 0) {
                const response = await GetProductByIdAsync(id);
                if (response.data) {
                    setProductInfo(response.data);
                }
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    }


    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            setProductInfo(prevState => ({ ...prevState, [name]: value }));
        }
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleSubmit = async () => {
        if (isValidate()) {
            console.log("isValidate");
            try {
                if (productInfo.id !== 0) {
                    var response = await UpdateProductAsync(productInfo.id, productInfo);
                    displaySnackbar("Product updated successfully", "success");
                }
                else {
                    await CreateProductAsync(productInfo);
                    displaySnackbar("Product added successfully", "success");
                }
                setTimeout(() => {
                    navigate(`/showproducts`)
                }, 1000)
            } catch (error) {
                console.error("Error  in saving Product information:", error);
            }
        } else {
            displaySnackbar("Fields marked in red are required", "error");
            setErrors(newErrors);
        }
    };

    const isValidate = () => {

        if (productInfo.productName.trim() === "") {
            newErrors.push({
                parameterName: "productName",
                errorMessage: "Enter product name",
            });
        }
        // else if (!isValidName(productInfo.productName)) {
        //     newErrors.push({
        //         parameterName: "productName",
        //         errorMessage: "Enter valid product name",
        //     });
        // }
        if (productInfo.price < 1) {
            newErrors.push({
                parameterName: "price",
                errorMessage: "Price Must be Grater than Zero",
            });
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handelShowList = () => {
        navigate("/showproducts");
    };

    const onInputChangeproduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        var name = event.currentTarget.name;
        var newValue = event.currentTarget.value;
        setProductInfo((prev) => ({ ...prev, [name]: newValue }));

        setErrors((prevErrors) => {
            const newErrors = prevErrors.filter((error) => error.parameterName !== name);
            return newErrors;
        });
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setProductInfo(prev => ({ ...prev, [name]: value }));
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };


    return {
        setProductInfo,
        productInfo,
        onInputChangeproduct,
        handelShowList,
        snackbarOpen,
        handleTextChange,
        handleNumberChange,
        handleSnackbarClose,
        snackbarMessage,
        snackbarSeverity,
        errors, handleSubmit,
        navigate, setErrors
    };
}


