import React, { useEffect, useState } from 'react'
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { useNavigate } from 'react-router-dom';
import GenderModel from '../Models/GenderModel';
import SnackBarGeneric from '../Generics/Components/Snackbar/SnackBarGeneric';
import { CreateInfo, GetAllAsync, GetInfoById, UpdateInfo } from '../Generics/Services/GenericService';

export default function GenderUtility(id: number) {
    const gendersAllData: string[] = [
        "Male",
        "Female",
        "Non-binary",
        "Transgender",
        "Agender",
        "Bigender",
        "Genderqueer",
        "Genderfluid",
        "Two-Spirit",
        "Third Gender",
        "Pangender",
        "Androgynous",
        "Demiboy",
        "Demigirl",
        "Gender-nonconforming",
        "Intersex",
        "Other",
        "Man",
        "Woman",
        "Trans man",
        "Trans woman",
        "Neutrois",
        "Trigender",
        "Polygender",
        "Multigender",
        "Fluidflux",
        "Neutrois",
        "Aliagender",
        "Xenogender",
        "Gender questioning",
        "Epicene",
        "Ambigender",
        "Hijra",
        "Two-spirit",
        "Genderqueer",
        "Intergender",
        "Femme",
        "Butch",
        "Gender neutral",
        "None",
        "Other",
        "Not listed",
        "Questioning",
        "Decline to state"
    ];

    const [genders, setGenders] = useState([""]);

    const navigate = useNavigate();
    const initialValue: GenderModel = {
        id: 0,
        genderName: "",
    };
    const [genderInfo, setGenderInfo] = useState<GenderModel>(initialValue);
    const [fetchGenderData, setFetchGenderData] = useState<GenderModel[]>([]);

    const initialErrors: ParameterErrorModel[] = [];
    const [errors, setErrors] = useState<ParameterErrorModel[]>(initialErrors);

    const {
        handleSnackbarClose,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        displaySnackbar,
    } = SnackBarGeneric();

    useEffect(() => {

        fetchData();
    }, [id]);
    const tableName = "gender";
    async function fetchData() {
        try {

            if (id > 0) {
                const response = await GetInfoById("gender", id);
                if (response.data) {
                    setGenderInfo(response.data);
                }
            }
            else {
                const result = await GetAllAsync(initialValue, tableName, 1, 100, "id", "asc");
                if (result != null) {
                    const genderExists = result.dataArray.map((item: GenderModel) => item.genderName);
                    const uniqueGenders = gendersAllData.filter(gender => !genderExists.includes(gender));
                    setGenders(uniqueGenders);
                }
            }
        } catch (error) {
            console.error("Error fetching Gender information:", error);
        }
    }

    const isValidate = () => {
        const newErrors: ParameterErrorModel[] = [];

        if (genderInfo.genderName === "") {
            newErrors.push({
                parameterName: "genderName",
                errorMessage: "Enter Gender Name",
            });
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handelShowList = () => {

        navigate("/genderDetails");
    };

    const handleSubmit = async () => {
        if (isValidate()) {
            if(id == 0){
                const result = await CreateInfo(genderInfo, tableName);
                displaySnackbar("Gender added successfully", "success")
            }else{
                const result = await UpdateInfo(genderInfo, tableName,id);
                displaySnackbar("Gender update successfully", "success")
                
            }
            displaySnackbar("Please fieled requie data", "error")

        }
    }
    return {
        handleSubmit,
        errors, setErrors,
        genderInfo, navigate,
        handelShowList,
        snackbarOpen,
        handleSnackbarClose,
        snackbarMessage,
        fetchGenderData, setGenderInfo,
        snackbarSeverity, genders
    };
}

