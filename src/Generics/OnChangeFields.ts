import { SelectChangeEvent } from "@mui/material";

import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { ParameterErrorModel } from "../Models/ParameterErrorModel";

export default function OnInputChange() {

    const initialErrors: ParameterErrorModel[] = [];
    const [errorInfo, setErrorInfo] = useState<ParameterErrorModel[]>(initialErrors);

    const onTextFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, set: any
    ) => {

        const { name, value } = event.currentTarget;
        set((prev: any) => ({ ...prev, [name]: value }));

    };

    const onTextFieldChangeError = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        set: any, setErrors: any, errors: ParameterErrorModel[]
    ) => {
        const { name, value } = event.currentTarget;
        if (value.length < 25) {
            set((prev: any) => ({ ...prev, [name]: value }));

            if (errors.some(error => error.parameterName === name)) {
                const updatedErrors = errors.filter(error => error.parameterName !== name);
                setErrors(updatedErrors);
            }
        }
    };


    const onDateFieldChange = (name: string, value: Dayjs, set: any) => {
        set((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onNumberFieldChange = (event: React.ChangeEvent<HTMLInputElement>, set: any
    ) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            set((prevState: any) => ({ ...prevState, [name]: value }));
        }

    };
    const onNumberFieldChangeError = (
        event: React.ChangeEvent<HTMLInputElement>, set: any,
        setErrors: any, errors: ParameterErrorModel[]
    ) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            if (value.length < 5) {
                set((prevState: any) => ({ ...prevState, [name]: value }));

                if (errors.some(error => error.parameterName === name)) {
                    const updatedErrors = errors.filter(error => error.parameterName !== name);
                    setErrors(updatedErrors);
                }
            }
        }

    };
    const onNumberFieldContactChangeError = (
        event: React.ChangeEvent<HTMLInputElement>, set: any,
        setErrors: any, errors: ParameterErrorModel[]
    ) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            if (value.length < 11) {
                set((prevState: any) => ({ ...prevState, [name]: value }));

                if (errors.some(error => error.parameterName === name)) {
                    const updatedErrors = errors.filter(error => error.parameterName !== name);
                    setErrors(updatedErrors);
                }
            }
        }

    };
    const onSelectFieldChange = (event: SelectChangeEvent<string>, set: React.Dispatch<React.SetStateAction<any>>) => {
        const name = event.target.name;
        const newValue = event.target.value;

        set((prevState: any) => ({ ...prevState, [name]: newValue }));
    };

    return {
        onSelectFieldChange,
        onDateFieldChange,
        onTextFieldChange,
        onNumberFieldChange,
        onTextFieldChangeError,
        onNumberFieldChangeError,
        onNumberFieldContactChangeError
    }
}