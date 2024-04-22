import React, { useEffect, useState } from 'react'
import { TaxModel } from '../../Models/TaxModel'
import { useNavigate } from 'react-router-dom';
import { CreateTaxAsync, GetTaxAsync, GetTaxByIdAsync, UpdateTaxAsync } from '../../Services/TaxService';
import { SnackbarOrigin } from '@mui/material';
import { ParameterErrorModel } from '../../Models/ParameterErrorModel';
import SnackBarGeneric from '../../Generics/Components/Snackbar/SnackBarGeneric';

export default function TaxUtility(id: number) {
    let initialValue: TaxModel = {
        id: 0,
        stateName: "",
        sgst: 0,
        cgst: 0,
        totalTax: 0
    }
    const navigate = useNavigate();

    const [taxInfo, setTaxInfo] = useState<TaxModel>(initialValue);
    const newErrors: ParameterErrorModel[] = [];
    const States: string[] = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
        'Andaman and Nicobar Islands',
        'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Lakshadweep',
        'Puducherry'
    ];
    const [indianStates, setIndianStates] = useState([""]);


    const [errors, setErrors] = useState<ParameterErrorModel[]>([]);

    const { handleSnackbarClose, snackbarOpen, snackbarMessage, snackbarSeverity, displaySnackbar } = SnackBarGeneric();


    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        if (id > 0) {
            try {
                const result = await GetTaxByIdAsync(id);
                if (result.data != null) {

                    setTaxInfo(result.data)

                    if (result.errorCode == "200") {
                        console.log("result.errorCode = " + result.errorCode)
                        if (result != null) {
                            setTaxInfo(result.data);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const result = await GetTaxAsync();
            const taxStates = result.data.map((item: { stateName: any; }) => item.stateName);
            const states: any = States.filter(state => !taxStates.includes(state));
            setIndianStates(states);
            setTaxInfo(initialValue);
        }
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setTaxInfo(prev => ({ ...prev, [name]: value }));
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value) && (Number(value) < 15)) {
            setTaxInfo(prevState => ({ ...prevState, [name]: value }));
        } else {
            displaySnackbar("Tax cant be greater than 15", "warning");
        }
        if (errors.some(error => error.parameterName === name)) {
            const updatedErrors = errors.filter(error => error.parameterName !== name);
            setErrors(updatedErrors);
        }
    };

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;
        setTaxInfo(prev => ({ ...prev, [name]: value }));
    };

    const isValidate = () => {

        if (taxInfo.stateName === "") {
            newErrors.push({
                parameterName: "stateName",
                errorMessage: "Please select state name"
            })
        }
        if (taxInfo.cgst === 0 || taxInfo.cgst.toString().trim() === "") {
            newErrors.push({
                parameterName: "cgst",
                errorMessage: "Please enter a cgst"
            })
        }
        if (taxInfo.sgst === 0 || taxInfo.cgst.toString().trim() === "") {
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
                    var result = await UpdateTaxAsync(taxInfo, id);
                    displaySnackbar("Tax updated successfully", "success");
                } else {
                    var result = await CreateTaxAsync(taxInfo);
                    displaySnackbar("Tax added successfully", "success");
                }
                setErrors(newErrors);

                setTimeout(() => {
                    navigate(`/showtaxes`);
                }, 1000);
            } catch (error) {
                displaySnackbar(String(error), "info");
            }
        } else {
            displaySnackbar("Fields marked in red are required", "error");
            setErrors(newErrors);
        }
    }
    return { navigate, indianStates, setTaxInfo, taxInfo, handleTextChange, handleNumberChange, handleSelectChange, handleSubmit, errors, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity };

}
