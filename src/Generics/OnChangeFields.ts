import { SelectChangeEvent } from "@mui/material";

import React, { useState } from "react";
import { Dayjs } from "dayjs";

export default function OnInputChange() {

    const onTextFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, set: any
    ) => {

        const { name, value } = event.currentTarget;
        set((prev: any) => ({ ...prev, [name]: value }));

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
            set((prevState : any )=> ({ ...prevState, [name]: value }));
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
        onNumberFieldChange
    }
}