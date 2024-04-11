import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../Models/UserModel';
import { GetAllUserService, DeleteUserService } from '../Services/UserService';

export default function ShowUserUtility() {

    const initialValue : UserModel = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: ''
    }
    
    const [userInfo, setUserInfo] = useState<UserModel[]>([initialValue]);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    },[])
    
    const fetchData = async () => {
        try{
            const result = await GetAllUserService();
            console.log(result.data);
            setUserInfo(result.data);
    
        }catch(error){
            console.log(error);
        }
    }

    async function handleDelete(id: number){
        const confirmation = window.confirm("Are you sure ? ");
        if(confirmation){
            const result = await DeleteUserService(id);
            console.log(result.data);
            fetchData();
        }
    }

    const handleEdit = (id : number) =>  {
        navigate(`/user/${id}`)
    }
  return {handleDelete, userInfo, handleEdit}
}