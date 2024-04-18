import React, { useEffect, useState } from 'react'
import { SubscriberModel } from '../Models/SubscriberModel'
import { GetAllGenderAsync } from '../Services/GenderService';
import GenderModel from '../Models/GenderModel';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  SelectChangeEvent,
  SnackbarOrigin,
} from "@mui/material";
import { userInfo } from 'os';
import { isValidName, removeSpace, isValidEmailAddress, isValidContactNumber, isValidPassword } from '../Generics/Validations';
import { ParameterErrorModel } from '../Models/ParameterErrorModel';
import { CreateSubscriberAsync, GetSubscriberAsync, GetSubscriberByIdAsync, UpdateSubscriberAsync } from '../Services/SubscriberService';
import SnackBarGeneric from '../Generics/Snackbar/SnackBarGeneric';
import { useNavigate } from 'react-router-dom';

export default function SubscriberUtility(id: number) {

  const navigate = useNavigate();
  const genderInitialValue: GenderModel = {
    id: 0,
    genderName: ''
  }


  const [genders, setGenders] = useState<GenderModel[]>([genderInitialValue]);

  const initialValue: SubscriberModel = {
    id: 0,
    firstName: '',
    contactNumber: '',
    email: '',
    genderId: -1,
    lastName: ''
  }

  const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel>(initialValue);

  useEffect(() => {
    fetchData();
    console.log("use effect")
  }, [id])

  const {displaySnackbar ,handleSnackbarClose, snackbarOpen,snackbarMessage, snackbarSeverity} = SnackBarGeneric();

  async function fetchData() {
    try {
      console.log("fetchData")

      const response = await GetAllGenderAsync();
      setGenders(response.data);
      console.log(genders)
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error)
    }
    if (id > 0) {
      try {
        const result = await GetSubscriberByIdAsync(id);
        if (result.errorCode == "200") {
          console.log(result.data)
          setSubscriberInfo(result.data);
        }
      } catch (error) {
        alert(error)
      }
    } else {
      setSubscriberInfo(initialValue);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    const name = event.target.name;

    setSubscriberInfo(prev => ({ ...prev, [name]: val }));
  };
  const handleSelectChange = (
    event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setGenders((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setSubscriberInfo(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const newErrors: ParameterErrorModel[] = [];

  const [errors, setErrors] = useState<ParameterErrorModel[]>([]);


  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setSubscriberInfo(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    console.log("submit")

    if (isValidate()) {
      setDefaultValue();
      console.log("Subscriber info")
      console.log(subscriberInfo)
      if (id > 0) {
        alert("Update");
        const response = await UpdateSubscriberAsync(subscriberInfo, id);
        console.log("response data  update ");
        console.log(response);
        displaySnackbar("Subscriber details updated successfully","success");
      } else {
        alert("add");
       // subscriberInfo.genderId += 1;
        const response = await CreateSubscriberAsync(subscriberInfo);
        console.log("response data added");
        console.log(response);
        displaySnackbar("Subscriber details added successfully","success");
      }
      setTimeout(() => {
        navigate(`/showsubscribers`); 
    }, 1000);
    } else {
      displaySnackbar("Please field mendatory fields","error");
    }
    setErrors(newErrors);

  }

  const setDefaultValue = () => {
    if (subscriberInfo.genderId === -1) {
      subscriberInfo.genderId = 6;
    }
  }
  const isValidate = () => {

    if (subscriberInfo.firstName.trim() === "") {
      newErrors.push({
        parameterName: "firstName",
        errorMessage: "Please enter a first name"
      })
      console.log("first name")
    } else if (subscriberInfo.firstName.length > 25) {
      newErrors.push({
        parameterName: "firstName",
        errorMessage: "FirstName atmost contain 25 chars"
      })
    } else if (!isValidName(subscriberInfo.firstName)) {
      newErrors.push({
        parameterName: "firstName",
        errorMessage: "Please enter valid first name"
      })
    } else {
      subscriberInfo.firstName = removeSpace(subscriberInfo.firstName);
    }

    if (subscriberInfo.lastName.trim() === "") {
      newErrors.push({
        parameterName: "lastName",
        errorMessage: "Please enter a Last name"
      })
      console.log("lastName")
    } else if (subscriberInfo.lastName.length > 25) {
      newErrors.push({
        parameterName: "lastName",
        errorMessage: "LastName atmost contain 25 chars"
      })
    } else if (!isValidName(subscriberInfo.lastName)) {
      newErrors.push({
        parameterName: "lastName",
        errorMessage: "Please enter valid Last name"
      })
    } else {
      subscriberInfo.lastName = removeSpace(subscriberInfo.lastName);
    }

    if (subscriberInfo.email.trim() === "") {
      newErrors.push({
        parameterName: "email",
        errorMessage: "Please enter a email"
      })

      console.log("email")
    }
    else if (!isValidEmailAddress(subscriberInfo.email)) {
      newErrors.push({
        parameterName: "email",
        errorMessage: "Please enter valid email"
      })
      console.log("email 1")
    }

    if (subscriberInfo.contactNumber.trim() === "") {
      newErrors.push({
        parameterName: "contactNumber",
        errorMessage: "Please enter a mobile number"
      })
      console.log("Contact Number")
    }
    else if (subscriberInfo.contactNumber.length != 10) {
      newErrors.push({
        parameterName: "contactNumber",
        errorMessage: "Please enter 10 digit mobile number"
      })
    }
    else {
      if (!isValidContactNumber(subscriberInfo.contactNumber)) {
        newErrors.push({
          parameterName: "contactNumber",
          errorMessage: "Please enter a valid mobile number"
        })
        console.log("Contact Number 1")
      }
    }

    if (subscriberInfo.genderId === -1) {
      newErrors.push({
        parameterName : "genderId",
        errorMessage : "Please select the gender"
      })
      console.log("gender is not valid")
    }
    setErrors(newErrors);

    return newErrors.length === 0;
  };
  return { errors, handleChange, handleSubmit, handleNumberChange, subscriberInfo, handleTextChange, genders, handleSelectChange, setSubscriberInfo, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarSeverity }
}


