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
import { GetSubscriberAsync, GetSubscriberByIdAsync } from '../Services/SubscriberService';

export default function SubscriberUtility(id: number) {

  const genderInitialValue: GenderModel = {
    id: 0,
    genderName: ''
  }


  const [genders, setGenders] = useState<GenderModel[]>([genderInitialValue]);

  var genderId = 0;
  const initialValue: SubscriberModel = {
    id: 0,
    firstName: '',
    contactNumber: '',
    email: '',
    genderId: 0,
    lastName: ''
  }

  const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel>(initialValue);



  useEffect(() => {
    fetchData();
    console.log("use effect")
  }, [])

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

  async function fetchData() {
    try {
      console.log("fetchData")

      const response = await GetAllGenderAsync();
      setGenders(response.data);
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error)
    }
    if (id > 0) {
      try {
        const result = await GetSubscriberByIdAsync(id);
        console.log(result.data)
        setSubscriberInfo(result.data);
      } catch (error) {
        alert(error)
      }
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

  function handleSubmit() {
    console.log("submit")

    if (isValidate()) {
      if (id > 0) {
        alert("Update")
      } else {
        alert("add");

      }
    } else {
      setSnackbarMessage("Fields marked in red are required");
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setErrors(newErrors);
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


    setErrors(newErrors);

    return newErrors.length === 0;
  };
  return { errors, handleChange, handleSubmit, handleNumberChange, subscriberInfo, handleTextChange, genders, handleSelectChange, setSubscriberInfo, snackbarOpen, handleSnackbarClose, snackbarMessage, snackbarPosition, snackbarSeverity }
}


