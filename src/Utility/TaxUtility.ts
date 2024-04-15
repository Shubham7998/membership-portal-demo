import React, { useEffect, useState } from 'react'
import { TaxModel } from '../Models/TaxModel'
import { useNavigate } from 'react-router-dom';
import { CreateTaxAsync, GetTaxAsync, GetTaxByIdAsync, UpdateTaxAsync } from '../Services/TaxService';
import { SnackbarOrigin } from '@mui/material';
import { ParameterErrorModel } from '../Models/ParameterErrorModel';

export default function TaxUtility(id: number) {
    let initialValue: TaxModel = {
        id: 0,
        sgst: 0,
        cgst: 0,
        totalTax: 0
    }
    const navigate = useNavigate();

    const [taxInfo, setTaxInfo] = useState<TaxModel>(initialValue);

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
    }, [])

    const fetchData = async () => {
        if (id > 0) {
            try {
                const result = await GetTaxByIdAsync(id);
                console.log("result.errorCode = " + result.errorCode)
                if (result.errorCode == "200") {
                    console.log("result.errorCode = " + result.errorCode)
                    if (result != null) {
                        setTaxInfo(result.data);
                        console.log(result.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setTaxInfo(initialValue);
        }
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setTaxInfo(prev => ({ ...prev, [name]: value }));
        // isValidate();
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            setTaxInfo(prevState => ({ ...prevState, [name]: value }));
        }
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;
        setTaxInfo(prev => ({ ...prev, [name]: value }));
        // isValidate();
    };

    const isValidate = () => {

        if(taxInfo.cgst === 0){
            newErrors.push({
                parameterName: "cgst",
                errorMessage: "Please enter a cgst"
            })
        }
        if(taxInfo.sgst === 0){
            newErrors.push({
                parameterName: "sgst",
                errorMessage: "Please enter a sgst"
            })
        }

        setErrors(newErrors);

        return newErrors.length === 0;
    };

    async function handleSubmit() {
        if (isValidate()) {
            try {
                if (id > 0) {
                    alert("update");
                    var result = await UpdateTaxAsync(taxInfo, id);
                    alert(result.data);
                    console.log(result.data);
                    setSnackbarMessage("Tax updated successfully");
                } else {
                    var result = await CreateTaxAsync(taxInfo);
                    alert(result.data);
                    console.log(result.data);
                    setSnackbarMessage("Tax added successfully");
                }
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setErrors(newErrors);

                //Navigate to another page after 2 seconds
                setTimeout(() => {
                    navigate(`/showtaxes`); 
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
    return { taxInfo, handleTextChange, handleNumberChange, handleSelectChange, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarPosition, snackbarSeverity };

}
