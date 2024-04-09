import React, { useEffect, useState } from 'react'
import { UserModel } from '../Models/UserModel';
import { CreateUserService, GetUserService, UpdateUserService } from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

export function UserUtility(id: number) {
    const initialValue: UserModel = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: ''
    }

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserModel>(initialValue);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        if (id > 0) {
            try {
                const result = await GetUserService(id);
                setUserInfo(result.data);
                console.log(result.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value)) {
            setUserInfo(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit() {
        try{
            if (id > 0) {
                alert("update");
                var result = await UpdateUserService(userInfo, id);
                alert(result.data);
                console.log(result.data);
            } else {
                var result = await CreateUserService(userInfo);
                alert(result.data);
                console.log(result.data);
            }
            navigate(`/showuser`)
            
        }catch(error){
            console.log(error)
        }
    }

    return { userInfo, handleTextChange, handleNumberChange, handleSelectChange, handleSubmit };
}
