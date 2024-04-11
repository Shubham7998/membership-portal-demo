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

export default function SubscriberUtility(id: number) {

  const genderInitialValue: GenderModel = {
    id: 0,
    genderName: ''
  }

  var genders;
  const [gendersInfo, setGendersInfo] = useState<GenderModel>(genderInitialValue)

  const [gender, setGender] = useState<GenderModel[]>([genderInitialValue]);

  var genderId = 0;
  const initialValue: SubscriberModel = {
    id: 0,
    firstName: '',
    contactNumber: '',
    email: '',
    genderId: 0
  }

  const [subscriberInfo, setSubscriberInfo] = useState<SubscriberModel>(initialValue);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      const response = await GetAllGenderAsync();
     // alert(JSON.stringify(response.data));
      genders = response.data;
      console.log("Genders")
      console.log(genders);
      setGender(response.data);
      console.log("response.data")
      console.log(response.data)
      console.log("gendersInfo")
      console.log(gendersInfo)
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error)
    }
    if (id > 0) {
      try {
        const result = "";
      } catch (error) {

      }
    }
  }

  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   const name = event.target.value as string;
  //   const value = event.target.value as string; 
  //   setGendersInfo(prev => ({ ...prev, [name]: Number(value) }))
  // };
  const handleSelectChange = (
    event: SelectChangeEvent) => {
      const name = event.target.name;
      const value = event.target.value;
     
    setGender((prevState) => ({ ...prevState, [name]: value}));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("1")
    const { name, value } = event.target;
    console.log("2")
    if (/^\d*$/.test(value)) {
      console.log("3")
        setSubscriberInfo(prevState => ({ ...prevState, [name]: value }));
    }
    // if (errors.some(error => error.parameterName === name)) {
    //     const updatedErrors = errors.filter(error => error.parameterName !== name);
    //     setErrors(updatedErrors);
    // }
};

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value } = event.currentTarget;
    setSubscriberInfo(prev => ({ ...prev, [name]: value }));

  }

  function handleSubmit() {
    alert("submit")
  }
  return { handleSubmit,handleNumberChange,subscriberInfo, handleTextChange, gender,gendersInfo, handleSelectChange,setSubscriberInfo }
}


