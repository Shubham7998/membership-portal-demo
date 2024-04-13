import { SnackbarOrigin } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParameterErrorModel } from "../Models/ParameterErrorModel";
import { ProductModel } from "../Models/ProductModel";
import { CreateProductAsync, DeleteProductAsync, GetProductByIdAsync, UpdateProductAsync } from "../Services/ProductService";
import { isValidName } from "../Generics/Validations";

export default function ProductUtility(id: number) {
    const navigate = useNavigate();
    const initialValue: ProductModel = {
        id: id,
        productName: "",
        price: 0,
    };

    const [productInfo, SetProductInfo] = useState<ProductModel>(initialValue);


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

    async function fetchData() {
        try {
            if (id > 0) {
                const response = await GetProductByIdAsync(id);
                if (response.data) {
                    SetProductInfo(response.data);
                }
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    }


    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            SetProductInfo(prevState => ({ ...prevState, [name]: value }));
        }
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleSubmit = async () => {
        alert("save");
        if (isValidate()) {
            console.log("isValidate");
            try {
                if (productInfo.id !== 0) {
                    console.log("Updateproductinfo")
                    var response = await UpdateProductAsync(productInfo.id, productInfo);
                    setSnackbarMessage("Product added successfully");
                }
                else {
                    alert("Createproductinfo");
                    await CreateProductAsync(productInfo);
                    setSnackbarMessage("Product data created successfully");
                }
                SetProductInfo(initialValue);
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
        const newErrors: ParameterErrorModel[] = [];

        if (productInfo.productName === "") {
            newErrors.push({
                parameterName: "productName",
                errorMessage: "Enter product name",
            });
        } else if (!isValidName(productInfo.productName)) {
            newErrors.push({
                parameterName: "productName",
                errorMessage: "Enter valid product name",
            });
        }
        if (productInfo.price < 0) {
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
        SetProductInfo((prev) => ({ ...prev, [name]: newValue }));

        setErrors((prevErrors) => {
            const newErrors = prevErrors.filter((error) => error.parameterName !== name);
            return newErrors;
        });
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        SetProductInfo(prev => ({ ...prev, [name]: value }));
        // isValidate();
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };


    return {
        productInfo,
        onInputChangeproduct,
        handelShowList,
        snackbarOpen,
        handleTextChange,
        handleNumberChange,
        handleSnackbarClose,
        snackbarMessage,
        snackbarPosition,
        snackbarSeverity,
        errors,handleSubmit
    };
}


